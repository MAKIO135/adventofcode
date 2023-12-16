const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
    const nx = input[0].length
    const ny = input.length

    log({nx, ny})

    input = input.join('').split('') // convert to array for manipulation
    
    input.forEach((c, i) => {
        if(c !== 'O') return;

        while(i-nx >= 0 && input[i-nx] === '.') {
            [input[i], input[i-nx]] = [input[i-nx], input[i]]
            i -= nx
        }
    })
    // log(input.join(''))
    
    const load = input.reduce((acc, c, i) => {
        if(c !== 'O') return acc

        const y = i / nx | 0
        return acc + ny - y
    }, 0)
    log(load)
})