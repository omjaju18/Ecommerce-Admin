import { PrismaClient } from "@prisma/client";

//Declare a global variable prisma with a type of PrismaClient or undefined.

declare global {
  var prisma: PrismaClient | undefined;
}

//Create a variable prismadb that either uses the existing globalThis.prisma or initializes a new PrismaClient instance.

const prismadb = globalThis.prisma || new PrismaClient();

//If not in "production" mode, assign prismadb to the global variable globalThis.prisma.
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
