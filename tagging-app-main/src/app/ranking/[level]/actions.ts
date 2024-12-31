'use server'
import { prisma } from '@/services/prisma'

export async function getBest(level: string) {
  return await prisma.score.findMany({
    orderBy: { time: 'asc' },
    include: { user: true },
    where: { levelId: level }
  })
}
