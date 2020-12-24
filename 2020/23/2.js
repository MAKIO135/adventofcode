const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    input = input.split('').map(d => parseInt(d))

    const cups = {}
    const nbCups = 1000000
    const ids = new Array(nbCups).fill(0).map((d, i) => i < input.length ? input[i] : i + 1)
    for(const [i, v] of ids.entries()) cups[v] = (ids[i + 1] || ids[0])

    let id = ids[0]
    for(let i = 10000000; i--;) {
        const picks = [cups[id], cups[cups[id]], cups[cups[cups[id]]]]
        cups[id] = cups[picks[2]]
        
        let dest = id - 1 || nbCups
        while(dest === picks[0] || dest === picks[1] || dest === picks[2]) dest = dest - 1 || nbCups
        
        cups[picks[2]] = cups[dest]
        cups[dest] = picks[0]

        id = cups[id]
    }
    
    log(cups[1] * cups[cups[1]])
})