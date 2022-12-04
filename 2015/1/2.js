const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('')
    let floor = 0
    let index = 0

    for(let i = 0; i < input.length; i++) {
        floor += (input[i] === '(' ? 1 : -1)

        if(floor === -1) {
            index = i + 1
            break
        }
    }

    log({index})
})