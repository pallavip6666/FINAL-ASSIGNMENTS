'use client'
import Image from 'next/image'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { normalizeCoords } from '@/utils/calculate'
import axios from 'axios'
import { Level } from '@/types'
import { ControlBar } from './components/ControlBar'
import { format } from 'date-fns'
import Link from 'next/link'
import { getStorage, setStorage } from '@/utils/storage'

export function Game({ level }: { level: Level }) {
  const [currentList, setList] = useState<Level['subjects']>(level.subjects)
  const [started, setStarted] = useState<boolean>(false)
  const [finalized, setFinalized] = useState<number>(0)
  const [waiting, setWaiting] = useState<boolean>(false)
  const [name, setName] = useState<string | undefined>(getStorage('name'))
  const [send, setSend] = useState<boolean>(true)

  const box = useRef<HTMLDivElement>(null)
  const image = useRef<HTMLImageElement>(null)
  const form = useRef<HTMLFormElement>(null)

  async function handleClick(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) {
    if (!started || finalized) return
    setWaiting(true)
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY
    const pos = normalizeCoords({ x, y }, { reference: e.currentTarget.width })
    if (waiting) return
    const { data } = await axios.post(`/api/verify/${level.slug}`, { pos })
    setWaiting(false)
    if (data.index >= 0) {
      const newList = [...currentList]
      const { index } = data
      newList[index].found = true
      setList(newList)
      if (data.win > 0) {
        setFinalized(data.win)
      }
    }
  }
  useEffect(() => {
    const currentImage = image.current
    const handleMouseMove = (event: MouseEvent) => {
      if (box.current) {
        box.current.style.left = event.pageX - 28 + 'px'
        box.current.style.top = event.pageY - 24 + 'px'
      }
    }
    if (image.current) {
      currentImage?.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      currentImage?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [started])

  async function sendScore(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!send) return
    const action = e.currentTarget.action
    const formData = new FormData(e.currentTarget).entries()
    const formJson = Object.fromEntries(formData)
    setStorage('name', formJson.name.toString())
    const res = await axios.post(action, formJson)
    if (res.status === 200) {
      setSend(false)
    }
  }
  return (
    <>
      <ControlBar
        level={level}
        currentList={currentList}
        setList={setList}
        started={started}
        setStarted={setStarted}
      />
      {finalized > 0 && (
        <dialog className="win-modal p-6 flex flex-col justify-between gap-5" open>
          <h3 className="text-center text-2xl">You found everyone</h3>
          <p>
            Time:{' '}
            <span className="font-mono">{format(finalized, 'mm:ss.SS')}</span>
          </p>
          <form
            ref={form}
            className={'submit-form' + `${send ? 'sending' : 'end'}`}
            onSubmit={sendScore}
            action={`/api/send/${level.slug}`}
          >
            <label>
              Name:{' '}
              <input
                type="text"
                name="name"
                minLength={3}
                maxLength={16}
                value={name}
                onChange={({ target }) => setName(target.value)}
                disabled={!send}
                autoFocus
              />
            </label>
            {send ? <button disabled={!send}>Submit</button> : <span>✔</span>}
          </form>
          <Link href={`/ranking/${level.slug}`}>Scoreboard</Link>
          <Link href={'/'}>Levels</Link>
        </dialog>
      )}
      <main>
        <div className="container" style={{ position: 'relative' }}>
          <Image
            ref={image}
            className={started ? 'started' : 'waiting'}
            src={`/${level.slug}/screen.jpg`}
            width={level.width}
            height={level.height}
            alt={level.title}
            onClick={handleClick}
          />
        </div>
        <div
          ref={box}
          className={'box ' + `${waiting ? 'wait' : 'no-wait'}`}
        ></div>
      </main>
    </>
  )
}
