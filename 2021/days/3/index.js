const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const lines = file.split('\n').filter(x => x !== '')

function calculateCommonBit(lines, position, useMost) {
  let zeros = 0
  let ones = 0
  lines.forEach(line => {
    if (line[position] === '0') {
      zeros++
    } else {
      ones++
    }
  })
  if (useMost) {
    return ones >= zeros ? '1' : '0'
  }
  return zeros > ones ? '1' : '0'
}

function part1(lines) {
  let gammaRateBits = []
  for (let i = 0; i < lines[0].length; i++) {
    gammaRateBits.push(calculateCommonBit(lines, i, true))
  }

  let epsilonRateBits = []
  for (let i = 0; i < lines[0].length; i++) {
    epsilonRateBits.push(calculateCommonBit(lines, i, false))
  }

  const gammaRate = parseInt(gammaRateBits.join(''), 2)
  const epsilonRate = parseInt(epsilonRateBits.join(''), 2)

  return gammaRate * epsilonRate
}

console.log('part 1 solution: ', part1(lines))

function filterRatingLines(lines, position, useMost) {
  const relevantBit = calculateCommonBit(lines, position, useMost)
  return lines.filter(line => line[position] === relevantBit)
}

function calculateRating(lines, useMost) {
  let filteredLines = [...lines]
  for (let i = 0; i < lines[0].length; i++) {
    filteredLines = filterRatingLines(filteredLines, i, useMost)
    if (filteredLines.length === 1) {
      return parseInt(filteredLines[0], 2)
    }
  }
}

function part2(lines) {
  let oxygenGeneratorRating = calculateRating(lines, true)
  let co2ScrubberRating = calculateRating(lines, false)

  return oxygenGeneratorRating * co2ScrubberRating
}

console.log('part 2 solution: ', part2(lines))
