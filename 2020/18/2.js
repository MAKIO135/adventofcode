const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const computeGroup = g => {
        let adds = g.match(/\d+\s\+\s\d+/g) // additions
        while(adds && adds.length) {
            adds.forEach(d => g = g.replace(d, eval(d)))
            adds = g.match(/\d+\s\+\s\d+/g)
        }

        let mults = g.match(/\d+\s\*\s\d+/g) // multiplications
        while(mults && mults.length) {
            mults.forEach(d => g = g.replace(d, eval(d)))
            mults = g.match(/\d+\s\*\s\d+/g)
        }

        return g
    }

    const sum = input.split('\n').map(line => {
        line = `(${line})` // consider the whole expression as a group

        let groups = line.match(/\([0-9+*\s]+\)/g)
        while(groups && groups.length) {
            groups.forEach(g => line = line.replace(g, computeGroup(g.slice(1, -1)))) // remove parentheses
            groups = line.match(/\([0-9+*\s]+\)/g)
        }

        return line
    }).reduce((acc, curr) => acc + parseInt(curr), 0)

    log(sum)
})