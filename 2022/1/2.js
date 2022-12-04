const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n\n').map(d => d.split('\n').map(n => parseInt(n)).reduce((acc, d) => acc + d)).sort((a,b) => b - a)
    
    log(input.filter((d,i)=> i < 3).reduce((acc, d) => acc + d))
})