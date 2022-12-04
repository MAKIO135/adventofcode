const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const range = (a , b) => a === b ? [a] : new Array(b - a + 1).fill(0).map((d, i) => a + i)

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
        .map(d => d.split(',').map(s => range(...s.split('-').map(n => parseInt(n)))))
        .filter(d => d[0].some(n => d[1].includes(n)))
    
    log(input.length)
})