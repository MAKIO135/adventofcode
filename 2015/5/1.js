const fs = require('fs')
const { clear, log } = require('console')
const { strict } = require('assert')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const niceStrings = input.split('\n')
        .filter(d => d.match(/[aeiou]/g)?.length >= 3)
        .filter(d => d.match(/([a-z])\1/g)?.length)
        .filter(d => !d.match(/ab|cd|pq|xy/g)?.length)
    
    log(niceStrings.length)
})