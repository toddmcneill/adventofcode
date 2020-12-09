const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const lines = file.split('\n').filter(x => x !== '')

function part1(lines) {
  return lines.reduce((acc, line) => {
    const [range, letterDef, password] = line.split(' ')
    const [min, max] = range.split('-')
    const letter = letterDef[0]

    const count = countLetter(password, letter)
    if (count >= min && count <= max) {
      acc++
    }

    return acc
  }, 0)

  function countLetter(str, letter) {
    return str.split('').reduce((acc, char) => {
      if (char === letter) {
        acc++
      }
      return acc
    }, 0)
  }
}

console.log('part 1 solution: ', part1(lines))


function part2(lines) {
  return lines.reduce((acc, line) => {
    const [positions, letterDef, password] = line.split(' ')
    const [first, second] = positions.split('-')
    const letter = letterDef[0]

    const firstIsValid = charAtIndex(password, letter, first)
    const secondIsValid = charAtIndex(password, letter, second)
    const passwordIsValid = firstIsValid ? !secondIsValid : secondIsValid

    if (passwordIsValid) {
      acc++
    }
    return acc
  }, 0)

  function charAtIndex(str, char, index) {
    return str[index - 1] === char
  }
}

console.log('part 2 solution: ', part2(lines))
