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

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
]

function validatePassport(passport) {
  return requiredFields.every(field => {
    return field in passport
  })
}

function validatePassportWithRules(passport) {
  const hasAllFields = validatePassport(passport)

  return hasAllFields && requiredFields.every(field => {
    const val = passport[field]
    const valAsInt = parseInt(val, 10)
    switch (field) {
      case 'byr':
        return val.length === 4 && valAsInt >= 1920 && valAsInt <= 2002
      case 'iyr':
        return val.length === 4 && valAsInt >= 2010 && valAsInt <= 2020
      case 'eyr':
        return val.length === 4 && valAsInt >= 2020 && valAsInt <= 2030
      case 'hgt':
        const matches = val.match(/^(\d+)(cm|in)$/)
        if (!matches) {
          return false
        }
        let [_, height, unit] = matches
        height = parseInt(height, 10)
        let heightIsValid = true
        if (unit === 'cm') {
          heightIsValid = height >= 150 && height <= 193
        }
        if (unit === 'in') {
          heightIsValid = height >= 59 && height <= 76
        }

        return heightIsValid
      case 'hcl': {
        const regex = /^#[\da-f]{6}$/
        return regex.test(val)
      }
      case 'ecl':
        const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
        return validColors.includes(val)
      case 'pid': {
        const regex = /^\d{9}$/
        return regex.test(val)
      }
      default: return true
    }
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
  return chunks.map(parseChunk).reduce((acc, cur) => {
    if (validatePassportWithRules(cur)) {
      acc ++
    }
    return acc
  }, 0)
}

console.log('part 2 solution: ', part2(chunks))
