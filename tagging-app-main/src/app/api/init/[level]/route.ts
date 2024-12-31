import { NextRequest, NextResponse } from 'next/server'
import { findLevel } from '@/utils/findLevel'
import { levelStatus, userData } from '@/types'
import { getUser, setUser } from '@/utils/cookie'

export async function POST (
  request: NextRequest,
  { params }: { params: { level: string } }
) {
  const { level } = params
  const userData: userData | null = await getUser() ?? newUser()
  if (!userData) {
    return NextResponse.json({ error: 'Invalid user' })
  }
  const { levelInfo, index } = findLevel(level)
  const subjectsMap = Array(levelInfo?.subjects.length).fill(false)
  const gameInstance: levelStatus = {
    levelName: levelInfo.slug,
    start: new Date().toString(),
    list: subjectsMap
  }
  userData.instances[index] = gameInstance
  await setUser(userData)
  return NextResponse.json(gameInstance)
}

function newUser() {
  return {
    id: crypto.randomUUID(),
    name: '',
    instances: []
  }
}
