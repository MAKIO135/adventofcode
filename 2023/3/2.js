const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const s = input.split('\n')
    const lineLength = s[0].length + 1
    const numbersByLine = s.map(l => [...l.matchAll(/\d+/g)].map(d => {
        const n = parseInt(d[0])
        const x = d.index
        const len = d[0].length
        return { n, x, len }
    }))

    const gears = [...input.matchAll(/\*/g)]
    .map(d => {
        const index = d.index
        const x = index % lineLength
        const y = index / lineLength | 0
        
        const adjacentNumbers = []

        ;[y-1, y, y+1].forEach(yy => numbersByLine[yy]?.forEach(d => {
            if(x >= d.x - 1 && x <= d.x + d.len) adjacentNumbers.push(d.n)
        }))

        return adjacentNumbers.length === 2 ? adjacentNumbers[0] * adjacentNumbers[1] : 0
    }).reduce((acc,d) => acc + d)

    log(gears)
})