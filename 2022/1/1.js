const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n\n').map(d => d.split('\n').map(n => parseInt(n)).reduce((acc, d) => acc + d))
    const max = Math.max(...input)
    
    log(max)
})