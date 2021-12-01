const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n').map(d => parseInt(d))
    //log(input)
    log(input.filter((d,i,a) => i > 0 && d > a[i-1]).length)
})