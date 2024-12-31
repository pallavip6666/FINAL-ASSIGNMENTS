import { prisma } from '@/services/prisma'
import { getUser, setUser } from '@/utils/cookie'
import { findLevel } from '@/utils/findLevel'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { level: string } }
) {
  const { level } = params
  const { index } = findLevel(level)
  const { name } = await request.json()
  const userData = await getUser()
  const winTime = userData?.instances[index].win
  if (winTime) {
    const userId = userData.id
    try {
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: {
          name
        },
        create: { id: userId, name }
      })
      const res = await prisma.score.create({
        data: {
          time: winTime,
          user: { connect: { id: user.id } },
          level: {
            connect: {
              id: level
            }
          }
        }
      })
      userData.instances[index].win = 0
      setUser(userData)
      return NextResponse.json(res)
    } catch (err) {
      console.error(err)
    }
  }
  return NextResponse.json({ error: 500 })
}
