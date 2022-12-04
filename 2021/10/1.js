const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n')

    const reg = /(?:\(\))|(?:\{\})|(?:\[\])|(?:\<\>)/g
    input.forEach((l, i) => {
        while(l.match(reg)?.length) {
            l = l.replaceAll(reg, '')
        }
        input[i] = l
    })

    const points = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    }

    const score = input.filter(l => l.match(/\)|\}|\]|\>/)?.length)
        .map(l => l.match(/\)|\}|\]|\>/)[0])
        .reduce((acc, d) => acc + points[d], 0)
    log(score)
})