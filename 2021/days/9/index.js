const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const map = file.split('\n').filter(x => x).map(row => row.split('').map(x => parseInt(x, 10)))

function isPointOnMap(map, point) {
  const [row, column] = point
  return map[row]?.[column] !== undefined
}

function getValueAtPoint(map, point) {
  const [row, column] = point
  return map[row][column]
}

function getAdjacentPoints(map, point) {
  const [row, column] = point
  const adjacentPoints = [
    [row - 1, column], // top
    [row, column + 1], // right
    [row + 1, column], // bottom
    [row, column - 1], // left
  ]
  return adjacentPoints.filter(a => isPointOnMap(map, a))
}

function isLowPoint(map, point) {
  const adjacentPoints = getAdjacentPoints(map, point)
  return adjacentPoints.every(a => getValueAtPoint(map, a) > getValueAtPoint(map, point))
}

function getLowPoints(map) {
  const lowPoints = []
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const point = [i, j]
      if (isLowPoint(map, point)) {
        lowPoints.push(point)
      }
    }
  }
  return lowPoints
}

function part1(map) {
  const lowPoints = getLowPoints(map)
  return lowPoints
    .map(point => getValueAtPoint(map, point)) // get value at point
    .map(l => l+1) // add 1 to get risk factor
    .reduce((acc, cur) => acc + cur, 0) // sum risk factors
}

console.log('part 1 solution: ', part1(map))

function isPointInBasin(basin, point) {
  const [pointRow, pointColumn] = point
  return basin.some(([basinRow, basinColumn]) => pointRow === basinRow && pointColumn === basinColumn)
}

function expandBasin(map, basin, point) {
  const expansionPoints = getAdjacentPoints(map, point)
    .filter(a => (
      !isPointInBasin(basin, a) &&
      getValueAtPoint(map, a) !== 9
    ))
  basin.push(...expansionPoints)
  expansionPoints.forEach(expansionPoint => {
    expandBasin(map, basin, expansionPoint)
  })

  return basin
}

function part2(map, basinCnt) {
  const lowPoints = getLowPoints(map)
  const basins = lowPoints.map(lowPoint => expandBasin(map, [], lowPoint))
  const sortedBasins = basins.sort((a, b) => a.length < b.length ? 1 : -1)
  return sortedBasins.slice(0, basinCnt).reduce((acc, cur) => acc * cur.length, 1)
}

console.log('part 2 solution: ', part2(map, 3))
