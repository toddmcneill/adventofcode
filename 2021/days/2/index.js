const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const navSteps = file.split('\n').filter(x => x !== '')

function splitNavStep(navStep) {
  const [bearing, amount] = navStep.split(' ')
  return [bearing, parseInt(amount, 10)]
}

function part1(navSteps) {
  let distance = 0
  let depth = 0
  navSteps.forEach(navStep => {
    const [bearing, amount] = splitNavStep(navStep)
    switch (bearing) {
      case 'forward':
        distance += amount
        return
      case 'down':
        depth += amount
        return
      case 'up':
        depth -= amount
        return
    }
  })
  return distance * depth
}

console.log('part 1 solution: ', part1(navSteps))

function part2(navSteps) {
  let distance = 0
  let depth = 0
  let aim = 0
  navSteps.forEach(navStep => {
    const [bearing, amount] = splitNavStep(navStep)
    switch (bearing) {
      case 'forward':
        distance += amount
        depth += amount * aim
        return
      case 'down':
        aim += amount
        return
      case 'up':
        aim -= amount
        return
    }
  })
  return distance * depth
}

console.log('part 2 solution: ', part2(navSteps))
