import { JWTPayload } from 'jose'

export interface Subjects {
  name: string
  found?: boolean
  cords?: {
    x: number
    y: number
  }[]
}

export interface Level {
  title: string
  slug: string
  width: number
  height: number
  subjects: Subjects[]
}

export interface levelStatus {
  levelName: string
  start: string
  win?: number
  list: boolean[]
}

export interface userData extends JWTPayload {
  id: string
  name: string
  instances: levelStatus[]
}
