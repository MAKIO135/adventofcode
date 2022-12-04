const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
        .map(d => d.split(''))
        .map(d => {
            const compartments = [[], []]
            d.forEach((item, i) => compartments[i < d.length/2 ? 0 : 1].push(item))
            const item = [...new Set(...compartments[0].filter(d => compartments[1].includes(d)))][0]
            const charCode = item.charCodeAt(0)
            const priority = charCode < 96 ? charCode - 64 + 26 : charCode - 96
            return priority
        })
    
    log(input.reduce((a,d) => a + d))
})