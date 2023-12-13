const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const extractNumbers = s => [...s.matchAll(/\d+/g)].map(d => parseInt(d[0]))

fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
    
    log(input)
})