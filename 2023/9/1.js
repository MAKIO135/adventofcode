const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const extractNumbers = s => [...s.matchAll(/-?\d+/g)].map(d => parseInt(d[0]))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    
    input = input.split('\n').map(extractNumbers)
    .map(l => {
        const diffs = [l]
        
        const computeLineDiffs = l => l.reduce((acc, d, i, arr) => {
            if(i === 0) return acc
            acc.push(arr[i] - arr[i - 1])
            return acc
        }, [])

        let lineDiff = computeLineDiffs(l)
        diffs.push(lineDiff)

        while(lineDiff.some(d => d !== 0)) {
            lineDiff = computeLineDiffs(lineDiff)
            diffs.push(lineDiff)
        }

        diffs.reverse().forEach((d, i) => {
            if(i > 0) {
                const prev = diffs[i-1]
                d.push(d[d.length-1] + prev[prev.length - 1])
            }
        })
        return diffs.reverse()
    })
    
    log(input.reduce((acc, d) => acc + d[0][d[0].length - 1], 0))
})