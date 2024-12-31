import { Level, Subjects } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'

type Props = {
  level: Level
  currentList: Subjects[]
  setList: React.Dispatch<React.SetStateAction<Subjects[]>>
  started: boolean
  setStarted: (value: React.SetStateAction<boolean>) => void
}
export function ControlBar({
  level,
  currentList,
  setList,
  started,
  setStarted
}: Props) {
  async function start(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const res = await axios.post(`/api/init/${level.slug}`, {
      levelName: level.slug
    })
    if (res.status === 200) {
      const newList = currentList.map((l) => {
        return { ...l, found: false }
      })
      setList(newList)
      setStarted(true)
    }
  }
  return (
    <div className="start-modal flex flex-col p-3 gap-3">
      <h2>{level.title}</h2>
      <div className="find-list">
        {currentList.map((s) => {
          return (
            <article className={s.found ? 'found' : 'no-found'} key={s.name}>
              <Image
                width={50}
                height={50}
                src={`/${level.slug}/${s.name}.webp`}
                alt=""
              />
              <span>{s.name}</span>
            </article>
          )
        })}
      </div>
      {!started && <button onClick={start}>Start</button>}
    </div>
  )
}
