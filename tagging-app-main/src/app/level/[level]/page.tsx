import { Game } from './Game'
import { getLevel } from '@/utils/findLevel'
import './game.css'
export default function Level({ params }: { params: { level: string } }) {
  let title = 'Level'
  const { level } = params
  const levelData = getLevel(level)
  title += levelData ? `: ${levelData.title}` : ' not found'
  return (
    <>
      <title>{title}</title>
      <main className="flex flex-col p-4">
        {levelData ? <Game level={levelData} /> : <h2>Level Not Found</h2>}
      </main>
    </>
  )
}
