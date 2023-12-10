const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let [LR, network] = input.split('\n\n')
    LR = LR.split('')
    network = network.split('\n').reduce((acc,d) => {
        let [pos, L, R] = [...d.matchAll(/[A-Z]+/g)].map(r => r[0])
        acc[pos] = { L, R }
        return acc
    }, {})

    log(LR, network)

    const start = 'AAA'
    const end = 'ZZZ'

    let nbSteps = 0
    let pos = network[start]
    while(pos !== network[end]) {
        pos = network[pos[LR[nbSteps%LR.length]]]
        nbSteps++
    }

    log(nbSteps)
})