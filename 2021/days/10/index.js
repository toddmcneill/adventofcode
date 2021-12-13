const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const lines = file.split('\n').filter(x => x)

function isOpeningChar(char) {
  switch (char) {
    case '(':
    case '[':
    case '{':
    case '<':
      return true
    default:
      return false
  }
}

function getPairedClosingChar(char) {
  switch (char) {
    case '(': return ')'
    case '[': return ']'
    case '{': return '}'
    case '<': return '>'
    default: return null
  }
}

function getLineCorruptingChar(line) {
  const chars = line.split('')
  const stack = []
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]
    if (isOpeningChar(char)) {
      stack.push(char)
    } else {
      const peekChar = stack[stack.length - 1]
      if (getPairedClosingChar(peekChar) === char) {
        stack.pop()
      } else {
        return char
      }
    }
  }
  return null
}

function getCorruptCharScore(char) {
  switch (char) {
    case ')': return 3
    case ']': return 57
    case '}': return 1197
    case '>': return 25137
    default: return 0
  }
}

function part1(lines) {
  const lineCorruptingChars = lines.map(line => getLineCorruptingChar(line)).filter(x => x)
  return lineCorruptingChars.map(getCorruptCharScore).reduce((acc, cur) => acc + cur, 0)
}

console.log('part 1 solution: ', part1(lines))

function isLineCorrupt(line) {
  return !!getLineCorruptingChar(line)
}

function getMissingClosingChars(line) {
  const chars = line.split('')
  const stack = []
  const missingClosingChars = []
  for (let i = 0; i < chars.length; i++) {
    if (isOpeningChar(chars[i])) {
      stack.push(chars[i])
    } else {
      stack.pop()
    }
  }
  while (stack.length) {
    const char = stack.pop()
    missingClosingChars.push(getPairedClosingChar(char))
  }

  return missingClosingChars
}

function getClosingCharScore(char) {
  switch (char) {
    case ')': return 1
    case ']': return 2
    case '}': return 3
    case '>': return 4
    default: return 0
  }
}

function calculateLineScore(chars) {
  let score = 0
  for (let i = 0; i < chars.length; i++) {
    score *= 5
    score += getClosingCharScore(chars[i])
  }
  return score
}

function part2(lines) {
  const sortedLineScores = lines
    .filter(line => !isLineCorrupt(line))
    .map(getMissingClosingChars)
    .map(calculateLineScore)
    .sort((a, b) => a < b ? -1 : 1)

  return sortedLineScores[Math.floor(sortedLineScores.length / 2)]
}

console.log('part 2 solution: ', part2(lines))
