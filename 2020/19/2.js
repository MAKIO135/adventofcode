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
    fixed[42] = fixed[42].replace(/\(/g, '(?:')
    fixed[31] = fixed[31].replace(/\(/g, '(?:')
    const regex42 = new RegExp(`^(${fixed[42]})`)
    const regex31 = new RegExp(`(${fixed[31]})$`)
    const regex4231 = new RegExp((`^(${fixed[42]})[ab]+(${fixed[31]})$`))

    let valids = messages.filter(m => regex4231.test(m))
        .map(m => {
            let test42 = 0
            let test31 = 0
            while(regex42.test(m) || regex31.test(m)) {
                if(regex42.test(m)) test42 ++
                if(regex31.test(m)) test31 ++
                m = m.replace(regex42, '').replace(regex31, '')
            }
            
            // there should be at least 1 more test42 than test31
            if(test31 >= test42) m = 'fail'

            return m
        })
        .filter(m => m === '')

    log(valids.length)
})