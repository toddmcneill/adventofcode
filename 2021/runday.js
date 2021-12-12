const path = require('path')
const fs = require('fs')

const [, , day] = process.argv

if (typeof day === 'undefined') {
  console.error('specify a day')
  process.exit(1)
}

const filename = path.join(__dirname, 'days', day)
let shouldRequire = false

try {
  if (fs.existsSync(filename)) {
    shouldRequire = true
  } else {
    console.error(`day ${day} does not exist`)
  }
} catch(err) {
  console.error(`day ${day} does not exist`)
}

if (shouldRequire) {
  require(filename)
}
