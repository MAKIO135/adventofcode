const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const sum = input.split('\n')
        .map(d => {
            const [l, w, h] = d.split('x').map(b => parseInt(b))
            const sides = [ l * w, w * h, h * l]
            const smallest = Math.min(...sides)
            return sides.reduce((acc, cur) => acc + 2 * cur, 0) + smallest
        })
        .reduce((acc, cur) => acc + cur)

    log({ sum })
})