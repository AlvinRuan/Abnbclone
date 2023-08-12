import { PrismaClient } from "@prisma/client";

// give global definition of definition of client
declare global {
  var prisma: PrismaClient | undefined;
}

// create constant searches for globalThis.prisma or use PrismaClient
const client = globalThis.prisma || new PrismaClient();

// best practice for prisma with next13
// used because nextjs HOT RELOADING can cause alot of new client instances to be created
if (process.env.NODE_ENV != "production") {
  globalThis.prisma = client;
}

export default client;
