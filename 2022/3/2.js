const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
        .map(d => [...new Set(d.split(''))])
        .reduce((acc, d, i) => {
            const groupIndex = i / 3 | 0
            if(!acc[groupIndex]) acc[groupIndex] = []
            acc[groupIndex].push(d)
            return acc
        }, [])
        .map(g => g[0].filter(item => g.every(pack => pack.includes(item)))[0])
        .map(item => {
            const charCode = item.charCodeAt(0)
            const priority = charCode < 96 ? charCode - 64 + 26 : charCode - 96
            return priority
        })
    
    log(input.reduce((a,d) => a + d))
})