const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

// https://learnersbucket.com/examples/algorithms/program-to-find-the-gcd-of-two-numbers-in-javascript/
let gcd = (a, b) => b === 0 ? a : gcd(b, a % b)

// https://learnersbucket.com/examples/algorithms/find-the-lcm-of-two-numbers-in-javascript/
let lcm = (a, b) => (a * b) / gcd(a, b)

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let [LR, network] = input.split('\n\n')
    LR = LR.split('')
    network = network.split('\n').reduce((acc,d) => {
        let [pos, L, R] = [...d.matchAll(/[\dA-Z]+/g)].map(r => r[0])
        acc[pos] = { L, R, pos }
        return acc
    }, {})

    // log(LR, network)

    let pos = Object.keys(network)
    .filter(k => k.endsWith('A'))
    .map(k => network[k])
    
    // PGCD/LCM
    let nbSteps = pos.map(p => {
        let steps = 0
        while(!p.pos.endsWith('Z')) {
            p = network[p[LR[steps%LR.length]]]
            steps++
        }
        return steps
    }).reduce((acc, d, i) => i === 0 ? d : lcm(acc, d), 0)

    log(nbSteps)
})