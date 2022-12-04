const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const range = (a , b) => a === b ? [a] : new Array(b - a + 1).fill(0).map((d, i) => a + i)

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
        .map(d => d.split(',').map(s => s.split('-').map(n => parseInt(n))))
        .filter(d => (d[0][0] <= d[1][0] && d[0][1] >= d[1][1]) || (d[0][0] >= d[1][0] && d[0][1] <= d[1][1]))
    
    log(input.length)
})