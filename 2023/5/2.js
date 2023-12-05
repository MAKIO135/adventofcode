const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const extractNumbers = s => [...s.matchAll(/\d+/g)].map(d => parseInt(d[0]))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n\n').map(p => p.split('\n').map((l, i) => i === 0 ? l : extractNumbers(l)))

    const seeds = extractNumbers(input.shift()[0])
    
    const seedRanges = seeds.reduce((acc, d, i) => {
        if(i % 2 === 1) acc.push([seeds[i-1], seeds[i-1]+d-1])
        return acc
    }, [])

    const maps = input.map(d => {
        const name = d.shift()
        const ranges = d.map(([destStart, srcStart, len], i) => ({srcStart, srcEnd: srcStart + len - 1, destStart, destEnd : destStart + len - 1, len, i}))
            .sort((a, b) => a.srcStart - b.srcStart)
        return ranges
    })

    const passMap = (inputs, map) => {
        const n = []
        inputs.forEach(inputRange => inputRange.map(v => n.push({n : v})))
        map.forEach(r => n.push(
            {n : r.srcStart, r}, 
            {n : r.srcEnd, r})
        )
        const sorted = n.sort((a, b) => (a.n - (a.r ? 1 : 0)) - (b.n - (b.r ? 1 : 0)))
        
        let outputs = []

        let currentRange = undefined
        let isIn = false
        sorted.forEach(({n, r}, i) => {
            if(r && n == r.srcStart) {
                currentRange = r
                if(isIn) {
                    if(!sorted.some(d => d.n === n-1)) outputs.push(n-1)
                    outputs.push(r.destStart)
                }
            }
            if(r && n == r.srcEnd) {
                currentRange = undefined
                if(isIn) {
                    outputs.push(r.destEnd)
                    if(!sorted.some(d => d.n === n+1)) outputs.push(n+1)
                }
            }
            
            if(!r) {
                isIn = !isIn
                if(currentRange) outputs.push(currentRange.destStart + (n - currentRange.srcStart))
                else outputs.push(n)
            }
        })

        return outputs.reduce((acc, d, i) => {
            if(i % 2) acc.push([outputs[i-1], d])
            return acc
        }, [])
    }

    log(maps.reduce((acc, map) => passMap(acc, map), seedRanges).flat().sort((a, b) => a - b)[0])
})