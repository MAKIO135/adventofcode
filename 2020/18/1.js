const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const computeGroup = g => {
        let result = 0
        let operator = '+'
        
        // remove parentheses
        g = g.split('')
        g.shift()
        g.pop()
        g = g.join('')

        g = g.split(' ')

        g.forEach(c => {
            if(['+', '*'].includes(c)) operator = c
            else {
                c = parseInt(c)
                if(operator === '+') result += c
                if(operator === '*') result *= c
            }
        })

        return result
    }

    const results = input.split('\n').map(l => {
        // add parentheses to consider the whole expression as a group
        l = l.split('')
        l.unshift('(')
        l.push(')')
        l = l.join('')

        let groups = l.match(/\([0-9+*\s]+\)/g)
        while(groups && groups.length) {
            groups.forEach(g => {
                l = l.replace(g, computeGroup(g))
            })
            groups = l.match(/\([0-9+*\s]+\)/g)
        }
        
        return l
    })
    // log(results)

    const sum = results.reduce((acc, curr) => acc + parseInt(curr), 0)
    log(sum)
})