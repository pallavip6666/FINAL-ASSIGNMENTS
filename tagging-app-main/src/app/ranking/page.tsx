import level from '@/data/dataLevel.json'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ranking'
}
export default function Ranking() {
  return (
    <div>
      {level.map((l) => {
        return (
          <div key={l.slug}>
            <Link href={`/ranking/${l.slug}`}>
              <h3>{l.title}</h3>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
