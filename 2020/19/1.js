const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let [rules, messages] = input.split('\n\n')
        .map(d => d.split('\n'))
    
    let fixed = {}
    rules = rules.reduce((acc, curr) => {
        let [id, rule] = curr.split(': ')
        if(/\"[ab]\"/.test(rule)) fixed[id] = rule.replace(/\"/g, '')
        else acc[id] = rule
        return acc
    }, {})

    while(Object.keys(rules).length) {
        Object.keys(rules).forEach((id) => {
            Object.entries(fixed).forEach(([k, v]) => {
                const regex = new RegExp(`\\b${k}\\b`, 'g')
                rules[id] = rules[id].replace(regex, ` (${v}) `)
            })
            if(!/\d+/g.test(rules[id])) {
                fixed[id] = `${rules[id].replace(/\s/g, '').replace(/\(([ab])\)/g, '$1')}`
                delete rules[id]
            }
        })
    }

    const regex = new RegExp(`\\b${fixed[0]}\\b`)
    log(messages.filter(m => regex.test(m)).length)
})