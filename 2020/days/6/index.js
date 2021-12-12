const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const groups = file.split('\n\n')

function countUniqueAnswers(group) {
  const answers = group.replace(/\n/g, '').split('')
  const set = new Set(answers)
  return set.size
}

function part1(groups) {
  const uniqueAnswersPerGroup = groups.map(countUniqueAnswers)
  return uniqueAnswersPerGroup.reduce((acc, cur) => acc + cur, 0)
}

console.log('part 1 solution: ', part1(groups))

function countConsensusAnswers(group) {
  const answersByPerson = group.split('\n').filter(x => x).map(a => a.split(''))

  return answersByPerson[0].reduce((acc, cur) => {
    if (answersByPerson.every(individualAnswers => individualAnswers.includes(cur))) {
      acc++
    }
    return acc
  }, 0)
}

function part2(groups) {
  const consensusAnswersPerGroup = groups.map(countConsensusAnswers)
  return consensusAnswersPerGroup.reduce((acc, cur) => acc + cur, 0)
}

console.log('part 2 solution: ', part2(groups))
