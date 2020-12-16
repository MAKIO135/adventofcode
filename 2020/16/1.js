const { clear, log } = require('console')
clear()

const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let [rules, ticket, nearby] = input.split('\n\n').map(d => d.split('\n'))
    ticket.shift()
    nearby.shift()

    rules = rules.map(rule => rule.match(/\d+-\d+/g).map(range => range.split('-').map(d => parseInt(d)))).flat()
    nearby = nearby.map(t => t.split(',').map(d => parseInt(d))).flat()

    let errorRate = nearby
        .filter(n => !rules.some(range =>  range[0] <= n && n <= range[1]))
        .reduce((acc, cur) => acc + cur, 0)
    
    log({errorRate})
})