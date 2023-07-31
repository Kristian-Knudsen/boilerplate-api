import { PrismaClient } from "@prisma/client";

export class Database {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
        this.prisma.$connect();

        // console.log("Connected to database")
    };
};