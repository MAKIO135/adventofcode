const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const reg = /(?:\(\))|(?:\{\})|(?:\[\])|(?:\<\>)/g
    input = input.split('\r\n')

    const pairs = {
        '(': ')',
        '{': '}',
        '[': ']',
        '<': '>'
    }

    const points = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }

    const score = input.reduce((acc, l, i) => {
            while(l.match(reg)?.length) l = l.replaceAll(reg, '')
            return !l.match(/\)|\}|\]|\>/)?.length ? [...acc, l]: acc
        }, [])
        .map(d => d.split('')
            .reverse()
            .reduce((acc, c) => acc * 5 + points[pairs[c]], 0)
        )
        .sort((a, b) => a - b)

    log(score[(score.length-1)/2])
})