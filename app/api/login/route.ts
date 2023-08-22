import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function GET(request: NextResponse) {
  const body = await request.json();
  const { email_address, password } = body;

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.findUnique({
    where: {
      email_address,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
