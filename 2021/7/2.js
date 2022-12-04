const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split(',').map(Number)

    const mean = input.reduce((a, b) => a + b, 0) / input.length | 0
    
    const nsum = n => n * (n + 1) / 2
    const dist = (arr, d) => arr.reduce((a, b) => a + nsum(Math.abs(b - d)), 0)
    const distances = [dist(input,mean),dist(input,mean+1)]
    log(Math.min(...distances))
})