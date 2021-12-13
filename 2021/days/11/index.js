const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const lines = file.split('\n').filter(x => x)

function parseLines(lines) {
  const grid = []
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      if (!grid[x]) {
        grid[x] = []
      }
      grid[x][y] = {
        level: parseInt(line[x], 10),
        x,
        y,
      }
    }
  }
  return grid
}

function getAdjacentOctopuses(grid, octopus) {
  const adjacentOctopuses = []
  for (let x = octopus.x - 1; x <= octopus.x + 1; x++) {
    for (let y = octopus.y - 1; y <= octopus.y + 1; y++) {
      if (x === octopus.x && y === octopus.y) {
        continue
      }
      if (grid[x]?.[y] === undefined) {
        continue
      }
      adjacentOctopuses.push(grid[x][y])
    }
  }
  return adjacentOctopuses
}

function cascadeFlash(grid, octopus, maxLevel) {
  const adjacentOctopuses = getAdjacentOctopuses(grid, octopus)
  adjacentOctopuses.forEach(adjacentOctopus => {
    adjacentOctopus.level++
    if (adjacentOctopus.level === maxLevel + 1) {
      cascadeFlash(grid, adjacentOctopus, maxLevel)
    }
  })
  return 0
}

function simulateStep(grid, maxLevel) {
  // Increment level and cascade flashes.
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const octopus = grid[x][y]
      octopus.level++
      if (octopus.level === maxLevel + 1) {
        cascadeFlash(grid, octopus, maxLevel)
      }
    }
  }

  // Count flashes and reset level.
  let flashes = 0
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const octopus = grid[x][y]
      if (octopus.level > maxLevel) {
        flashes++
        octopus.level = 0
      }
    }
  }
  return flashes
}

function part1(lines, steps, maxLevel) {
  const grid = parseLines(lines)
  let flashes = 0
  for (let i = 0; i < steps; i++) {
    const stepFlashes = simulateStep(grid, maxLevel)
    flashes += stepFlashes
  }
  return flashes
}

console.log('part 1 solution: ', part1(lines, 100, 9))

function getGridSize(grid) {
  return grid.reduce((acc, cur) => acc + cur.length, 0)
}

function part2(lines, maxLevel) {
  const grid = parseLines(lines)
  const gridSize = getGridSize(grid)
  let stepFlashes
  let step = 0
  do {
    stepFlashes = simulateStep(grid, maxLevel)
    step++
  } while (stepFlashes !== gridSize)
  return step
}

console.log('part 2 solution: ', part2(lines, 9))
