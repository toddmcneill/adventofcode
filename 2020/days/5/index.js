const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const lines = file.split('\n').filter(x => x !== '')

function splitLine(line) {
  return { rowStr: line.slice(0, 7), seatStr: line.slice(7) }
}

function calcRow(rowStr) {
  const binRowStr = rowStr.replace(/F/g, '0').replace(/B/g, '1')
  return parseInt(binRowStr, 2)
}

function calcSeat(seatStr) {
  const binRowStr = seatStr.replace(/L/g, '0').replace(/R/g, '1')
  return parseInt(binRowStr, 2)
}

function calcSeatId(line) {
  const { rowStr, seatStr } = splitLine(line)
  const row = calcRow(rowStr)
  const seat = calcSeat(seatStr)
  return (row * 8) + seat
}

function part1(lines) {
  const seatIds = lines.map(calcSeatId)
  return Math.max(...seatIds)
}

console.log('part 1 solution: ', part1(lines))

function part2(lines) {
  const seatIds = lines.map(calcSeatId)
  const maxSeatId = Math.max(...seatIds)

  seatIds.sort((a, b) => parseInt(a, 10) < parseInt(b, 10) ? -1 : 1)

  for (let i = 0; i < seatIds.length - 1; i++) {
    if (seatIds[i] + 1 !== seatIds[i+1]) {
      return seatIds[i] + 1
    }
  }
}

console.log('part 2 solution: ', part2(lines))
