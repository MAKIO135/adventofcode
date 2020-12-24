const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    const nbCups = 1000000
    input = input.split('').map(d => parseInt(d))
    const ids = new Array(nbCups).fill(0).map((d, i) => i < input.length ? input[i] : i + 1)
    const cups = {}
    for(const [i, v] of ids.entries()) {
        cups[v] = { next: (ids[i + 1] || ids[0]) }
    }

    let v = ids[0]
    let curr = cups[v]
    for(let i = 0; i < 10000000; i ++) {
        if(i % 100000 === 0) log(`-- move ${i + 1}--`)
        let picks = [
            curr.next, 
            cups[curr.next].next, 
            cups[cups[curr.next].next].next
        ]
        curr.next = cups[picks[2]].next
        
        let dest = v - 1 || nbCups
        while(dest === picks[0] || dest === picks[1] || dest === picks[2]) dest = dest - 1 || nbCups
        
        cups[picks[2]].next = cups[dest].next
        cups[dest].next = picks[0]

        v = curr.next
        curr = cups[v]
    }
    
    log(cups[1].next * cups[cups[1].next].next)
})