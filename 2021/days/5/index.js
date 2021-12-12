const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
function parseVent(vent) {
  const [start, end] = vent.split(' -> ')
  const [x1, y1] = start.split(',').map(num => parseInt(num, 10))
  const [x2, y2] = end.split(',').map(num => parseInt(num, 10))
  return { x1, y1, x2, y2 }
}
const vents = file.split('\n').filter(x => x).map(parseVent)

function isVentVertical(vent) {
  return vent.x1 === vent.x2
}

function isVentHorizontal(vent) {
  return vent.y1 === vent.y2
}

function isVentOrthogonal(vent) {
  return isVentVertical(vent) || isVentHorizontal(vent)
}

function computeVentPoints(vent) {
  const { x1, y1, x2, y2 } = vent
  const points = []
  if (isVentVertical(vent)) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      points.push(`${x1},${y}`)
    }
  } else if (isVentHorizontal(vent)) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      points.push(`${x},${y1}`)
    }
  } else { // diagonal
    let x = x1
    let y = y1
    while (x !== x2 && y !== y2) {
      points.push(`${x},${y}`)
      if (x < x2) {
        x++
      } else {
        x--
      }
      if (y < y2) {
        y++
      } else {
        y--
      }
    }
    points.push(`${x},${y}`)
  }
  return points
}

function generateVentMap(vents) {
  const map = {}
  vents.forEach(vent => {
    const ventPoints = computeVentPoints(vent)
    ventPoints.forEach(ventPoint => {
      if (!(ventPoint in map)) {
        map[ventPoint] = 0
      }
      map[ventPoint]++
    })
  })
  return map
}

function part1(vents) {
  const orthogonalVents = vents.filter(isVentOrthogonal)
  const ventMap = generateVentMap(orthogonalVents)
  return Object.values(ventMap).filter(height => height >= 2).length
}

console.log('part 1 solution: ', part1(vents))

function part2(vents) {
  const ventMap = generateVentMap(vents)
  return Object.values(ventMap).filter(height => height >= 2).length
}

console.log('part 2 solution: ', part2(vents))
