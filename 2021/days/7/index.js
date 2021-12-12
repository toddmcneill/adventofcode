const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const crabs = file.trim().split(',').map(x => parseInt(x, 10))

function calculateFuelCost(crabs, alignmentPosition) {
  return crabs.reduce((acc, cur) => acc + Math.abs(cur - alignmentPosition), 0)
}

function part1(crabs) {
  const minCrabPosition = crabs.reduce((acc, cur) => Math.min(acc, cur), 0)
  const maxCrabPosition = crabs.reduce((acc, cur) => Math.max(acc, cur), 0)
  let minFuelCost
  let i = minCrabPosition
  do {
    const fuelCost = calculateFuelCost(crabs, i)
    if (!minFuelCost || fuelCost < minFuelCost) {
      minFuelCost = fuelCost
    }
    i++
  } while(i < maxCrabPosition)
  return minFuelCost
}

console.log('part 1 solution: ', part1(crabs))

function calculateIncreasingFuelCost(crabs, alignmentPosition) {
  return crabs.reduce((acc, cur) => {
    const displacement = Math.abs(cur - alignmentPosition)
    let fuelCost = 0
    for (let i = 1; i <= displacement; i++) {
      fuelCost += i
    }
    return acc + fuelCost
  }, 0)
}

function part2(crabs) {
  const minCrabPosition = crabs.reduce((acc, cur) => Math.min(acc, cur), 0)
  const maxCrabPosition = crabs.reduce((acc, cur) => Math.max(acc, cur), 0)
  let minFuelCost
  let i = minCrabPosition
  do {
    const fuelCost = calculateIncreasingFuelCost(crabs, i)
    if (!minFuelCost || fuelCost < minFuelCost) {
      minFuelCost = fuelCost
    }
    i++
  } while(i < maxCrabPosition)
  return minFuelCost
}

console.log('part 2 solution: ', part2(crabs))
