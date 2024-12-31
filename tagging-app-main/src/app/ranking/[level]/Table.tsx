'use client'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { getBest } from './actions'
import TableLoad from './TableLoad'

type ScoreList = ({
  user: {
    id: string
    name: string
  }
} & {
  id: number
  time: number
  date: Date
  levelId: string
  userId: string
})[]

export default function Table({ level }: { level: string }) {
  const [list, setList] = useState<ScoreList>([])

  useEffect(() => {
    async function getList() {
      setList(await getBest(level))
    }
    getList()
  }, [level])
  return list.length > 0
    ? (
    <table>
      <tr>
        <th className="max-w-5">POS</th>
        <th>NAME</th>
        <th className="max-w-4">DATE</th>
        <th className="max-w-4">TIME</th>
      </tr>
      {list.map((s, index) => {
        return (
          <tr key={s.id} className="size-full">
            <td className="text-center max-w-4">{index + 1}</td>
            <td>{s.user.name}</td>
            <td className="text-center">{s.date.toLocaleDateString()}</td>
            <td className="font-mono text-center">
              {format(s.time, 'mm:ss.SSS')}
            </td>
          </tr>
        )
      })}
    </table>
      )
    : (
    <TableLoad />
      )
}
