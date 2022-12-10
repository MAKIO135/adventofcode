const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(l => {
        if(l.startsWith('n')) return { cmd :'noop' }
        else return { cmd: 'addx', n: parseInt(l.split(' ')[1]) }
    })

    let registerValue = 1
    let cycle = 0
    let signalStrengths = 0
    
    input.forEach(({cmd, n}) => {
        if(cmd === 'noop') {
            cycle ++
            if(cycle === 20 || (cycle - 20) % 40 === 0) {
                // log(cmd, cycle, registerValue)
                signalStrengths += cycle * registerValue
            }
        }
        else {
            for(let i = 0; i<2; i++) {
                cycle++
                if(cycle === 20 || (cycle - 20) % 40 === 0) {
                    // log(cmd, cycle, registerValue)
                    signalStrengths += cycle * registerValue
                }
                if(i === 1) registerValue += n
            }
        }
    })
    
    log(signalStrengths)
})