type coord = {
  x: number
  y: number
}

type options = {
  reference: number
  precision?: number
}

export function normalizeCoords(coords: coord, options: options) {
  const { reference, precision = 18 } = options
  const x = Math.floor((coords.x / reference) * precision)
  const y = Math.floor((coords.y / reference) * precision)
  return { x, y }
}
