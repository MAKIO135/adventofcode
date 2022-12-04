const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const computeGroup = g => {
        g = g.replace(/\(|\)/g, '') // remove parentheses
        
        if(g.includes('+')) {
            let groups = g.match(/\d+\s\+\s\d+/g)
            while(groups && groups.length) {
                g = g.replace(groups[0], eval(groups[0]))
                groups = g.match(/\d+\s\+\s\d+/g)
            }
        }

        if(g.includes('*')) {
            let groups = g.match(/\d+\s\*\s\d+/g)
            while(groups && groups.length) {
                g = g.replace(groups[0], eval(groups[0]))
                groups = g.match(/\d+\s\*\s\d+/g)
            }
        }

        return g
    }

    const results = input.split('\n').map(l => {
        l = `(${l})`// consider the whole expression as a group

        let groups = l.match(/\([0-9+*\s]+\)/g)
        while(groups && groups.length) {
            groups.forEach(g => l = l.replace(g, computeGroup(g)))
            groups = l.match(/\([0-9+*\s]+\)/g)
        }

        return l
    })
    const sum = results.reduce((acc, curr) => acc + parseInt(curr), 0)
    log(sum)
})