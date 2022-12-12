const fs = require('fs')
const { clear, log } = require('console')

clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let monkeys = input.split('\n\n').map(d => {
        d = d.split('\n')
        d.shift()

        const items = d[0].match(/\d+/g).map(d => parseInt(d))
        const op = old => eval(d[1].split('= ')[1])
        const test = n => n % parseInt(d[2].match(/\d+/)[0]) === 0 ? parseInt(d[3].match(/\d+/)[0]) : parseInt(d[4].match(/\d+/)[0])

        return {
            items,
            op,
            test,
            inspection: 0
        }
    })
    
    for(let i = 1; i < 21; i++) {
        monkeys.forEach(m => {
            m.items.forEach(d => {
                d = m.op(d)
                d = d / 3 | 0
                monkeys[m.test(d)].items.push(d)
                m.inspection ++
            })
            m.items = []
        })
    }
    
    monkeys = monkeys.sort((a, b) => b.inspection - a.inspection)
    log(monkeys[0].inspection * monkeys[1].inspection)
})