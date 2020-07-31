import { PrismaClient } from "@prisma/client";
// Exported so we can use this in any file we want.
export const prisma = new PrismaClient();

export const main = () => "this builds and pushes";
