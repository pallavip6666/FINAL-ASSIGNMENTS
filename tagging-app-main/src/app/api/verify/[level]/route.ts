import { userData } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { findLevel } from '@/utils/findLevel'
import { getUser, setUser } from '@/utils/cookie'

export async function POST(
  request: NextRequest,
  { params }: { params: { level: string } }
) {
  const { level } = params
  const userData: userData | null = await getUser()
  const { pos } = await request.json()
  if (!userData) return NextResponse.json({ error: 'invalid user data' })
  const { levelInfo, index } = findLevel(level)
  const levelList = levelInfo?.subjects
  const levelStatus = userData?.instances[index]
  if (!levelList) return NextResponse.json({ error: 'level not found' })
  const subjIndex = levelList.findIndex((i) =>
    i.coords.find((j) => j.x === pos.x && j.y === pos.y)
  )
  if (subjIndex >= 0 && !levelStatus.list[subjIndex]) {
    levelStatus.list[subjIndex] = true
    if (levelStatus.list.every((a) => a)) {
      levelStatus.win = Date.now() - Date.parse(levelStatus.start)
    }
  }
  await setUser(userData)
  return NextResponse.json({ index: subjIndex, win: levelStatus.win })
}
