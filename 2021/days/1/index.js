const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const nums = file.split('\n').filter(x => x !== '').map(x => parseInt(x, 10))

function part1(nums) {
  let cnt = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      cnt++
    }
  }
  return cnt
}

console.log('part 1 solution: ', part1(nums))

function part2(nums) {
  let cnt = 0
  for (let i = 3; i < nums.length; i++) {
    const firstWindow = nums[i-3] + nums[i - 2] + nums[i - 1]
    const secondWindow = nums[i - 2] + nums[i - 1] + nums[i]
    if (secondWindow > firstWindow) {
      cnt++
    }
  }
  return cnt
}

console.log('part 2 solution: ', part2(nums))
