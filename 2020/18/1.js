const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const computeGroup = g => {
        let result = 0, operator = '+'
        
        g.forEach(c => {
            if(['+', '*'].includes(c)) operator = c
            else {
                c = parseInt(c)
                if(operator === '+') result += c
                else if(operator === '*') result *= c
            }
        })

        return result
    }

    const sum = input.split('\n').map(l => {
        l = `(${l})` // consider the whole expression as a group

        let groups = l.match(/\([0-9+*\s]+\)/g)
        while(groups && groups.length) {
            groups.forEach(g => l = l.replace(g, computeGroup(g.slice(1, -1).split(' '))))  // remove parentheses and split by spaces
            groups = l.match(/\([0-9+*\s]+\)/g)
        }
        
        return l
    }).reduce((acc, curr) => acc + parseInt(curr), 0)
    log(sum)
})