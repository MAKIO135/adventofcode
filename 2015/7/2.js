const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const instructions = input.split('\n').map(d => {
        let [cmd, wire] = d.split(' -> ')
        if(wire === 'b') cmd = '3176'
        return {original: d, cmd, wire}
    })

    const wires = {}
    let prevLength = instructions.length + 1
    while(prevLength !== instructions.length) {
        prevLength = instructions.length

        for(let i = instructions.length - 1; i >= 0; i --) {
            const {original, cmd, wire} = instructions[i]

            let done = false
            if(!/[A-Za-z]+/g.test(cmd)) {
                wires[wire] = parseInt(cmd)
                done = true
            }
            else if(!/[A-Z0-9]/g.test(cmd)) {
                if(wires[cmd]) wires[wire] = wires[cmd]
            }
            else if(cmd.includes('AND')) {
                let [a, b] = cmd.split(' AND ')
                if((wires[a] !== undefined || a === '1') && wires[b] !== undefined) {
                    if(a === '1') wires[wire] = 1 & wires[b]
                    else wires[wire] = wires[a] & wires[b]
                    done = true
                }
            }
            else if(cmd.includes('OR')) {
                let [a, b] = cmd.split(' OR ')
                if(wires[a] !== undefined && wires[b] !== undefined) {
                    wires[wire] = wires[a] | wires[b]
                    done = true
                }
            }
            else if(cmd.includes('LSHIFT')) {
                let [w, n] = cmd.split(' LSHIFT ')
                if(wires[w] !== undefined) {
                    wires[wire] = wires[w] << parseInt(n)
                    done = true
                }
            }
            else if(cmd.includes('RSHIFT')) {
                let [w, n] = cmd.split(' RSHIFT ')
                if(wires[w] !== undefined) {
                    wires[wire] = wires[w] >> parseInt(n)
                    done = true
                }
            }
            else if(cmd.includes('NOT')) {
                let [, w] = cmd.split('NOT ')
                if(wires[w] !== undefined) {
                    wires[wire] = ~wires[w]
                    done = true
                }
            }

            if(done) {
                wires[wire] = (wires[wire] + 65536) % 65536
                // log(`${original}: ${wires[wire]}`)
                instructions.splice(i, 1)
            }
        }
    }

    log(wires.a)
})