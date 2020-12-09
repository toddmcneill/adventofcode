const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const nums = file.split('\n').filter(x => x !== '')
const target = 2020

function part1(nums, target) {
  let solution
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i+1; j < nums.length; j++) {
      const first = parseInt(nums[i], 10)
      const second = parseInt(nums[j], 10)
      if (first + second === target) {
        solution = first * second
      }
    }
  }
  return solution
}

console.log('part 1 solution: ', part1(nums, target))

function part2(nums, target) {
  let solution
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i+1; j < nums.length - 1; j++) {
      for (let k = j+1; k < nums.length; k++) {
        const first = parseInt(nums[i], 10)
        const second = parseInt(nums[j], 10)
        const third = parseInt(nums[k], 10)
        if (first + second + third === target) {
          solution = first * second * third
        }
      }
    }
  }
  return solution
}

console.log('part 2 solution: ', part2(nums, target))
