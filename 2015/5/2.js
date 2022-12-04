const fs = require('fs')
const { clear, log } = require('console')
const { strict } = require('assert')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const niceStrings = input.split('\n')
        .filter(d => d.match(/([a-z]{2})\w*\1/g)?.length)
        .filter(d => d.match(/([a-z])\w{1}\1/g)?.length)
    
    log(niceStrings.length)
})