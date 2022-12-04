const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n').map(l => l.split(' | ')[1]).map(d => d.split(' ')).flat().filter(d => d.length <= 4 || d.length === 7).length
    log(input)
})