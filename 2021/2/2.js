const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n').map(l => l.split(' '))
    //log(input)

    let x = 0
    let depth = 0
    let aim = 0
    input.forEach(([cmd, n]) => {
        n = parseInt(n)
        switch (cmd) {
            case 'forward':
                x += n
                depth += aim * n
                break;
            case 'up':
                aim -= n
                break;
            case 'down':
                aim += n
                break;
        }
    })
    log(x*depth)
})