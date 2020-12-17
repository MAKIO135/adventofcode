const { clear, log } = require('console')
clear()

const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let [rules, ticket, nearby] = input.split('\n\n').map(d => d.split('\n'))
    ticket.shift()
    ticket = ticket[0].split(',').map(d => parseInt(d))
    
    rules = rules.map(rule => ({
        name: rule.split(':')[0],
        ranges: rule.match(/\d+-\d+/g).map(range => range.split('-').map(d => parseInt(d)))
    }))
    
    nearby.shift()
    nearby = nearby.map(t => t.split(',').map(d => parseInt(d)))
        .filter(range => range.every(n => rules.some(rule => rule.ranges.some(range => range[0] <= n && n <= range[1]))))
    
    const fixed = []
    
    const observe = () => {
        rules.forEach(rule => {
            let index = []
            for(let i = 0; i < ticket.length; i ++) {
                if([ticket, ...nearby].every(t => rule.ranges.some(range => range[0] <= t[i] && t[i] <= range[1]))) index.push(i)
            }
            rule.index = index.length === 1 ? index[0] : index
        })
    }

    const propagate = () => {
        for(let i = rules.length - 1; i >= 0; i--) {
            const rule = rules[i]
            if(typeof rule.index === 'number') fixed.push(...rules.splice(i, 1))
        }
        
        rules.forEach(rule => {
            fixed.forEach(({index}) => {
                if(rule.index.indexOf(index) >= 0) {
                    rule.index.splice(rule.index.indexOf(index), 1)
                    if(rule.index.length === 1) rule.index = rule.index[0]
                }
            })
        })
    }

    observe()
    while(rules.length) propagate()
    // fixed.forEach(rule => log(`${rule.name}: ${rule.index}`))

    const result = fixed.filter(({name}) => name.startsWith('departure'))
        .reduce((acc, curr) => acc * ticket[curr.index], 1)
    
    log({ result })
})