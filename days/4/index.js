const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const chunks = file.split('\n\n')

function parseChunk(chunk) {
  return chunk.replace(/\n/g, ' ').split(' ').reduce((acc, cur) => {
    const [key, val] = cur.split(':')
    acc[key] = val
    return acc
  }, {})
}

function validatePassport(passport) {
  const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
  ]

  return requiredFields.every(field => {
    return field in passport
  })
}

function part1(chunks) {
  return chunks.map(parseChunk).reduce((acc, cur) => {
    if (validatePassport(cur)) {
      acc ++
    }
    return acc
  }, 0)
}

console.log('part 1 solution: ', part1(chunks))

function part2(chunks) {

}

console.log('part 2 solution: ', part2(chunks))
