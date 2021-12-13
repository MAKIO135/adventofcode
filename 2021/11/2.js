const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n').map(l => l.split('').map(Number))
    //log(input.map(d => d.join(',')).join('\r\n'))

    const update = arr => {
        let next = []
        arr.forEach(d => next.push([...d]))

        next = next.map(a => a.map(d => ++d))

        let stepFlashes = 0
        const flash = () => {
            for(let y = 0; y < next.length; y++) {
                for(let x = 0; x < next[0].length; x++) {
                    if(next[y][x] === 10) {
                        for(let yy = -1; yy <= 1; yy++){
                            if(next[y+yy]) {
                                for(let xx = -1; xx <= 1; xx++) {
                                    if(next[y+yy][x+xx]) next[y+yy][x+xx] = next[y+yy][x+xx] === 11 ? 11 : Math.min(next[y+yy][x+xx]+1, 10)
                                }
                            }
                        }
                        next[y][x] = 11
                        stepFlashes++
                    }
                }
            }
        }
        while(next.some(l => l.some(d => d === 10))) flash()

        next = next.map(a => a.map(d => d === 11 ? 0 : d))
        return [next, stepFlashes]
    }

    let stepFlashes = 0
    let step = 0
    while(stepFlashes !== input.length * input[0].length) {
        [input, stepFlashes] = update(input)

        step++
        if(stepFlashes === input.length * input[0].length) log(step)
    }
})