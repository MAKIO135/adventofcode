const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let cups = input.split('').map(d => parseInt(d))
    let nbCups = cups.length

    const N = 100
    for(let i = 0; i < N; i ++) {
        log(`-- move ${i + 1}--`)
        log(`cups: ${cups.map((d, j) => j === i % nbCups ? `(${d})` : d).join(' ')}`)
        let curr = cups[i % nbCups]
        let pickups = []
        for(let j = 0; j < 3; j ++) {
            pickups.push(...cups.splice((cups.indexOf(curr) + 1) % cups.length, 1))
        }
        log(`pick up: ${pickups.join(', ')}`)
        
        let dest = curr - 1 !== 0 ? curr - 1 : nbCups
        while(pickups.includes(dest)) {
            dest = dest - 1 !== 0 ? dest - 1 : nbCups
        }
        log(`destination: ${dest}`)

        cups.splice(cups.indexOf(dest) + 1, 0, ...pickups)

        while(cups.indexOf(curr) !== i % nbCups) cups.unshift(cups.pop())
        log('\n')
    }

    log(`-- final --`)
    log(`cups: ${cups.map((d, j) => j === N % nbCups ? `(${d})` : d).join(' ')}\n`)

    while(cups.indexOf(1) !== 0) cups.unshift(cups.pop())
    cups.shift()
    log(cups.join(''))
})