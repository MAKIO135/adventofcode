const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\r\n')
    
    log(input)
})