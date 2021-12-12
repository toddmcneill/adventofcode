const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const lines = file.split('\n').filter(x => x !== '')

function checkSlope(lines, dx, dy) {
  const patternWidth = lines[0].length
  const patternHeight = lines.length

  let x = 0
  let treesEncountered = 0
  for (let y = 0; y < patternHeight; y += dy) {
    const line = lines[y]
    const char = line[x % patternWidth]
    if (char === '#') {
      treesEncountered++
    }
    x += dx
  }

  return treesEncountered
}

function part1(lines) {
  const dx = 3
  const dy = 1
  return checkSlope(lines, dx, dy)
}

console.log('part 1 solution: ', part1(lines))

function part2(lines) {
  const slopes = [
    { dx: 1, dy: 1 },
    { dx: 3, dy: 1 },
    { dx: 5, dy: 1 },
    { dx: 7, dy: 1 },
    { dx: 1, dy: 2 },
  ]

  return slopes.map(({ dx, dy }) => {
    return checkSlope(lines, dx, dy)
  }).reduce((acc, cur) => {
    return acc * cur
  }, 1)
}

console.log('part 2 solution: ', part2(lines))
