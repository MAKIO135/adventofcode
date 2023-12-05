const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const extractNumbers = s => [...s.matchAll(/\d+/g)].map(d => parseInt(d[0]))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n\n').map(p => p.split('\n').map((l, i) => i === 0 ? l : extractNumbers(l)))

    const seeds = extractNumbers(input.shift()[0])

    const maps = input.map(d => {
        const name = d.shift()
        const ranges = d.map(([destStart, srcStart, len]) => ({srcStart, destStart, len}))
            .sort((a, b) => a.srcStart - b.srcStart)
        return { name, ranges }
    })
    
    const locations = seeds.map(s => {
        return maps.reduce((acc, d) => {
            const range = d.ranges.find(r => acc >= r.srcStart && acc < r.srcStart + r.len)
            return range ? range.destStart + (acc - range.srcStart) : acc
        }, s)
    })

    log(locations.sort((a,b) => a - b)[0])
})