const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(150))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let [rules, messages] = input.split('\n\n').map(d => d.split('\n'))
    
    let fixed = {}
    rules = rules.reduce((acc, curr) => {
        let [id, rule] = curr.split(': ')
        if(/\"[ab]\"/.test(rule)) fixed[id] = rule.replace(/\"/g, '')
        else acc[id] = rule
        return acc
    }, {})
    // overwrite rules 8 & 11
    rules['8'] = '42 | 42 8'
    rules['11'] = '42 31 | 42 11 31'

    let prev = -1
    while(Object.keys(rules).length !== prev) {
        prev = Object.keys(rules).length
        Object.keys(rules).forEach((id) => {
            Object.entries(fixed).forEach(([k, v]) => {
                const regex = new RegExp(`\\b${k}\\b`, 'g')
                rules[id] = rules[id].replace(regex, `(${v})`)
            })
            if(!/\d+/g.test(rules[id])) {
                fixed[id] = `${rules[id].replace(/\s/g, '').replace(/\(([ab])\)/g, '$1')}`
                delete rules[id]
            }
        })
    }

    // 0: 8 11
    // 8: 42 | 42 8
    // 11: 42 31 | 42 11 31
    const regex42 = new RegExp(`\\b(${fixed[42].replace(/\(/g, ('(?:'))})`)
    const regex31 = new RegExp(`(${fixed[31].replace(/\(/g, ('(?:'))})\\b`)
    const regex4231 = new RegExp((`\\b(${fixed[42]})[ab]+(${fixed[31]})\\b`).replace(/\(/g, ('(?:')))

    let valids = messages.filter(m => regex4231.test(m))
        .map(m => {
            while(regex42.test(m)) m = m.replace(regex42, '')
            while(regex31.test(m)) m = m.replace(regex31, '')
            return m
        })
        .filter(m => m === '')
    log(valids.length)

    // !341 too high
})