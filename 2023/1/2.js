const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const re = new RegExp(`${digits.join('|')}`, "g")

    const digits2 = digits.map(d => d.split('').reverse().join(''))
    const re2 = new RegExp(`${digits2.join('|')}`, "g")

    input = input.split('\n')
        .map((l, i) => {
            let l2 = l.split('').reverse().join('')
            ;[...l.matchAll(re)].forEach(d => l = l.replace(d[0], digits.indexOf(d[0])+1))

            ;[...l2.matchAll(re2)].forEach(d => l2 = l2.replace(d[0], digits2.indexOf(d[0])+1))
            let a = [...l.matchAll(/\d/g)]
            let a2 = [...l2.matchAll(/\d/g)]
            return parseInt(a[0][0] + a2[0][0])
        })
        .reduce((acc, d) => acc + d)
    
    log(input)
})