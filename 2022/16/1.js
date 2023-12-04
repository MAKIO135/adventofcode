const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(l => {
        const [from, ...to] = l.match(/[A-Z]{2}/g)
        const rate = parseInt(l.match(/\d+/g)[0])
        return { from, rate, to }
    })
    .sort((a, b) => b.rate - a.rate)
    .reduce((acc, { from, rate, to }) => {
        acc[from] = { rate, to, isOpen: false }
        return acc
    }, {})

    const valves = Object.keys(input)
    log(valves)

    let time = 30
    let pressureReleased = 0
    let currentLoc = input['AA']

    const move = v => {
        time --
        currentLoc = input[v]
    }

    const open = () => {
        input[currentLoc].isOpen = true
        time --
    }

    const releasePressure = () => {
        pressureReleased += valves.filter(k => input[k].isOpen)
            .map(k => input[k].rate)
            .reduce((acc, d) => acc + d)
    }


    
    log(input)
})