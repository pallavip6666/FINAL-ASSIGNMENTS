import './ranking.css'
import { findLevel } from '@/utils/findLevel'
import Table from './Table'

export default async function Ranking({
  params
}: {
  params: { level: string }
}) {
  const level = findLevel(params?.level)
  return (
    <main className="ranking">
      <h2>Scoreboard: {level.levelInfo.title}</h2>
      <Table level={params?.level} />
    </main>
  )
}
