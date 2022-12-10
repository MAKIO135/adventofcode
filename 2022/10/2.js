const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const screenW = 40
    const screenH = 6

    const screen = Array(screenH).fill(0).map(d => Array(screenW).fill('.'))

    input = input.split('\n').map(l => {
        if(l.startsWith('n')) return { cmd :'noop' }
        else return { cmd: 'addx', n: parseInt(l.split(' ')[1]) }
    })

    let registerValue = 1
    let cycle = 0
    
    input.forEach(({cmd, n}) => {
        if(cmd === 'noop') {
            if([registerValue - 1, registerValue, registerValue + 1].includes(cycle % screenW)) screen[cycle / screenW | 0][cycle % screenW] = '#'
            cycle ++
        }
        else {
            for(let i = 0; i<2; i++) {
                if([registerValue - 1, registerValue, registerValue + 1].includes(cycle % screenW)) screen[cycle / screenW | 0][cycle % screenW] = '#'
                cycle++
                if(i === 1) registerValue += n
            }
        }
    })
    
    log(screen.map(d => d.join('')).join('\n'))
})