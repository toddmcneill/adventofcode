const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const fish = file.trim().split(',').map(x => parseInt(x, 10))

function simulateDay(fish, reproductionDays) {
  const newFish = []
  let born = 0
  fish.forEach(f => {
    if (f === 0) {
      born++
      newFish.push(reproductionDays - 1)
    } else {
      newFish.push(f - 1)
    }
  })
  for(let i = 0; i < born; i++) {
    newFish.push(reproductionDays + 1)
  }
  return newFish
}

function part1(fish, daysToSimulate, reproductionDays) {
  let fishList = [...fish]
  for (let i = 0; i < daysToSimulate; i++) {
    fishList = simulateDay(fishList, reproductionDays)
  }
  return fishList.length
}

console.log('part 1 solution: ', part1(fish, 80, 7))

function groupFishByDay(fish, reproductionDays) {
  const fishByDay = []
  for (let i = 0; i <= reproductionDays + 1; i++) {
    fishByDay.push(fish.filter(f => f === i).length)
  }
  return fishByDay
}

function simulateDayEfficient(fishByDay, reproductionDays) {
  const newFishByDay = []
  for (let i = 0; i < fishByDay.length; i++) {
    if (i === 0) {
      newFishByDay[reproductionDays + 1] = fishByDay[0]
    } else if (i === reproductionDays) {
      newFishByDay[i - 1] = fishByDay[i] + fishByDay[0]
    } else {
      newFishByDay[i - 1] = fishByDay[i]
    }
  }
  return newFishByDay
}

function part2(fish, daysToSimulate, reproductionDays) {
  const fishByDay = groupFishByDay(fish, reproductionDays)
  let newFishByDay = [...fishByDay]
  for (let i = 0; i < daysToSimulate; i++) {
    newFishByDay = simulateDayEfficient(newFishByDay, reproductionDays)
  }
  return newFishByDay.reduce((acc, cur) => acc + cur)
}

console.log('part 2 solution: ', part2(fish, 256, 7))
