import { Subjects } from './../types.d'
import dataLevel from '@/data/dataLevel.json'

export function findLevel(levelName: string) {
  const index = dataLevel.findIndex((l) => l.slug === levelName)
  return { levelInfo: dataLevel[index], index }
}
export function getLevel(levelName: string) {
  const data = dataLevel.find((l) => l.slug === levelName)
  if (data) {
    return {
      ...data,
      subjects: formatList(data?.subjects)
    }
  }
}

function formatList(list: Subjects[]) {
  return list.map((l) => {
    return {
      name: l.name,
      found: false
    }
  })
}
