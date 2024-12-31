import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'

const prisma = new PrismaClient()

async function init() {
  const levels = JSON.parse(readFileSync('./src/data/dataLevel.json', 'utf-8'))
  try {
    levels.forEach(async (l) => {
      const level = await prisma.level.create({
        data: {
          id: l.slug,
          name: l.title
        }
      })
      console.log('Level registred', level)
    })
  } catch (err) {
    console.error(err)
  } finally {
    prisma.$disconnect()
  }
}
init()
