const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const input = file.split('\n\n')
const nums = input[0].split(',')

function formatBoardStr(boardStr) {
  const board = []
  const rows = boardStr.split('\n')
  rows.forEach(row => {
    const cells = row.split(' ').filter(x => x).map(x => x.trim())
    board.push(cells)
  })
  return board
}
const boards = input.slice(1).map(board => board.trim()).map(formatBoardStr)

function getBoardLines(board) {
  const lines = []
  board.forEach(row => lines.push(row))
  for(let i = 0; i < board[0].length; i++) {
    const column = []
    board.forEach(row => column.push(row[i]))
    lines.push(column)
  }
  return lines
}

function hasLineWon(line, numsCalled) {
  return line.every(num => numsCalled.includes(num))
}

function hasBoardWon(board, numsCalled) {
  const boardLines = getBoardLines(board)
  return boardLines.some(boardLine => hasLineWon(boardLine, numsCalled))
}

function scoreBoard(board, numsCalled) {
  const scoringNums = board.flat().filter(num => !(numsCalled.includes(num))).map(num => parseInt(num, 10))
  return scoringNums.reduce((acc, cur) => acc + cur, 0) * numsCalled[numsCalled.length - 1]
}

function part1(nums, boards) {
  let numsCalled
  let winningBoard
  dance:
  for (let i = 0; i < nums.length; i++) {
    numsCalled = nums.slice(0, i + 1)
    for (let j = 0; j < boards.length; j++) {
      if (hasBoardWon(boards[j], numsCalled)) {
        winningBoard = boards[j]
        break dance
      }
    }
  }

  return scoreBoard(winningBoard, numsCalled)
}

console.log('part 1 solution: ', part1(nums, boards))

function part2(nums, boards) {
  let numsCalled
  let lastWinningBoard
  let remainingBoards = [...boards]
  for (let i = 0; i < nums.length; i++) {
    numsCalled = nums.slice(0, i + 1)
    if (remainingBoards.length === 1) {
      if (hasBoardWon(remainingBoards[0], numsCalled)) {
        lastWinningBoard = remainingBoards[0]
        break
      }
    } else {
      remainingBoards = remainingBoards.filter(board => !hasBoardWon(board, numsCalled))
    }
  }

  return scoreBoard(lastWinningBoard, numsCalled)
}

console.log('part 2 solution: ', part2(nums, boards))
