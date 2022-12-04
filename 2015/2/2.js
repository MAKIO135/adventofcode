const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const sum = input.split('\n')
        .map(d => {
            const sides = d.split('x').map(b => parseInt(b))
            const smallestDimensions = [...sides].sort((a, b) => a - b)
            smallestDimensions.pop()
            const perimeter =  smallestDimensions.reduce((acc, cur) => acc + 2 * cur, 0)
            const ribbon = sides.reduce((acc, cur) => acc * cur, 1)
            return perimeter + ribbon
        })
        .reduce((acc, cur) => acc + cur)

    log({ sum })
})