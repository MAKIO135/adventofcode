const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n').map(d => parseInt(d))
    //log(input)
    log(input.filter((d,i,a) => i > 2 && d + a[i-1] + a[i-2] > a[i-1] + a[i-2] + a[i-3]).length)
})