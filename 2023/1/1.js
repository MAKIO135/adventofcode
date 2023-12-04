const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
        .map(l => {
            let a = [...l.matchAll(/\d/g)]
            return parseInt(a[0][0] + a[a.length-1][0])
        })
        .reduce((acc, d) => acc + d)
    
    log(input)
})