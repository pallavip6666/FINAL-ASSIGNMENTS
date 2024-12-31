import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // replaces the pool.js entirely

export default prisma;