const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split(',').map(Number).reduce((acc, d) => {acc[d] = (acc[ d] || 0) + 1; return acc} , [])
    log(input)
    
    const days = 256
    for(let i = 0; i < days; i++) {
        const c = input.shift()||0
        input[6] = (input[6] || 0) + c
        input[8] = c
    }
    log(input.reduce((acc, d) => acc + d))
})