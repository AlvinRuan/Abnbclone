import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// bcrypt is imported, which is a library used for hashing and comparing passwords securely.
import bcrypt from "bcrypt";

// import prisma from local function to prevent hot reloading issue
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  // Specifies the authentication adapter to be used.
  // In this case, it's the PrismaAdapter, indicating that Prisma will be used
  // as the data store.
  adapter: PrismaAdapter(prisma),
  // An array of authentication provider configurations.
  // It includes configurations for Google, GitHub
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // The authorize function within the CredentialsProvider
      // configuration is used to verify the provided email and password when users attempt
      // to log in with credentials.
      async authorize(credentials) {
        // Checks if both email and password are provided, and if not, throws an error.
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Input!");
        }
        // Finds the user in prisma
        const user = await prisma.user.findUnique({
          where: {
            email_address: credentials.email,
          },
        });

        // if no user, throws an error.
        // if no password or incorrect, throws an error.
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Input!");
        }

        // Compares the provided password with the hashed password
        // stored in the database using bcrypt.compare.
        const isCorrectPW = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // password is incorrect
        if (!isCorrectPW) {
          throw new Error("Invalid Input");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  // debug: Enables debugging in development mode based
  // on the NODE_ENV environment variable.
  debug: process.env.NODE_ENV == "development",
  // session: Configures the session strategy, which is set to "jwt"
  // (JSON Web Token) in this case.
  session: {
    strategy: "jwt",
  },
  // secret: The secret used for encrypting data in authentication flows.
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
