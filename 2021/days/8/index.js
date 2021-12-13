const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const lines = file.split('\n').filter(x => x)
const notes = lines.map(line => {
  const [patterns, output] = line.split(' | ')
  return {
    scrambledPatterns: patterns.split(' ').map(pattern => pattern.split('')),
    scrambledOutput: output.split(' ').map(output => output.split('')),
  }
})

function part1(notes) {
  return notes.reduce((acc, cur) => {
    return acc + cur.scrambledOutput.reduce((a, c) => {
      const is1478 = (
        c.length === 2 || // 1
        c.length === 4 || // 4
        c.length === 3 || // 7
        c.length === 7    // 8
      )
      return is1478 ? a + 1 : a
    }, 0)
  }, 0)
}

console.log('part 1 solution: ', part1(notes))

function sharesSegmentCount(pattern, target, matchTarget) {
  const matchCount = target.reduce((acc, cur) => pattern.includes(cur) ? acc + 1 : acc, 0)
  return matchCount === matchTarget
}

function unscrambleWiring(scrambledPatterns) {
  const one = scrambledPatterns.find(pattern => pattern.length === 2)
  const four = scrambledPatterns.find(pattern => pattern.length === 4)
  const seven = scrambledPatterns.find(pattern => pattern.length === 3)
  const eight = scrambledPatterns.find(pattern => pattern.length === 7)

  // Shares 3 segments with 4 and both segments with 1
  const zero = scrambledPatterns.find(pattern => (
    pattern.length === 6 &&
    sharesSegmentCount(pattern, four, 3) &&
    sharesSegmentCount(pattern, one, 2)
  ))

  // Shares 1 segment with 1, 2 with 4, and 2 with 7
  const two = scrambledPatterns.find(pattern => (
    pattern.length === 5 &&
    sharesSegmentCount(pattern, one, 1) &&
    sharesSegmentCount(pattern, four, 2) &&
    sharesSegmentCount(pattern, seven, 2)
  ))

  // Shares both right hand segments with 1
  const three = scrambledPatterns.find(pattern => (
    pattern.length === 5 &&
    sharesSegmentCount(pattern, one, 2)
  ))

  // Shares 1 segment with 1 and 3 with 4
  const five = scrambledPatterns.find(pattern => (
    pattern.length === 5 &&
    sharesSegmentCount(pattern, one, 1) &&
    sharesSegmentCount(pattern, four, 3)
  ))

  // Shares 3 segments with 4 and 1 segment with 1
  const six = scrambledPatterns.find(pattern => (
    pattern.length === 6 &&
    sharesSegmentCount(pattern, four, 3) &&
    sharesSegmentCount(pattern, one, 1)
  ))

  // Shares all segments with 4
  const nine = scrambledPatterns.find(pattern => (
    pattern.length === 6 &&
    sharesSegmentCount(pattern, four, 4)
  ))

  return [zero, one, two, three, four, five, six, seven, eight, nine]
}

function doPatternsMatch(a, b) {
  return (
    a.length === b.length &&
    a.every(x => b.includes(x))
  )
}

function unscrambleOutput(scrambledOutput, wiring) {
  const outputNums = scrambledOutput.map(outputNum => wiring.findIndex(w => doPatternsMatch(w, outputNum)))
  return parseInt(outputNums.join(''), 10)
}

function part2(notes) {
  const outputs = notes.map(note => {
    const wiring = unscrambleWiring(note.scrambledPatterns)
    return unscrambleOutput(note.scrambledOutput, wiring)
  })

  return outputs.reduce((acc, cur) => acc + cur, 0)
}

console.log('part 2 solution: ', part2(notes))
