const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')

    const floor = input[0].split('').reduce((acc, curr) => acc + (curr === '(' ? + 1 : -1), 0)

    log({floor})
})