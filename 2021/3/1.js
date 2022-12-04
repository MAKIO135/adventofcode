const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n').map(l => l.split(''))
    //log(input)

    let gamma = ''
    let epsilon = ''

    input[0].forEach((c, i) => {
        let n0 = 0
        let n1 = 0
        input.forEach(l => {
            if(l[i] === '0') n0++
            else n1++
        })
        gamma += n0 > n1 ? '0' : '1'
    })

    gamma = parseInt(gamma, 2)
    log(gamma)
    epsilon = gamma ^ parseInt('1'.repeat(input[0].length), 2)
    log(epsilon)
    const power = gamma * epsilon
    log(power)
})