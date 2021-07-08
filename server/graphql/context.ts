import { PrismaClient } from '@prisma/client'
import { Artist } from '.prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

export interface Context {
    prisma: PrismaClient
}

export function context(): Context {
    return { prisma }
}
