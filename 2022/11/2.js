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
        const testN = parseInt(d[2].match(/\d+/)[0])
        const test = n => n % testN === 0 ? parseInt(d[3].match(/\d+/)[0]) : parseInt(d[4].match(/\d+/)[0])

        return {
            items,
            op,
            test,
            testN,
            inspection: 0
        }
    })
    // log(monkeys)

    let pgcd = monkeys.reduce((acc,m) => acc * m.testN, 1)
    
    for(let i = 1; i <= 10000; i++) {
        monkeys.forEach(m => {
            m.items.forEach(d => {
                d = m.op(d) % pgcd 
                monkeys[m.test(d)].items.push(d)
                m.inspection ++
            })
            m.items = []
        })
    }
    log(monkeys.map(d => d.inspection), '\n')
    
    monkeys = monkeys.sort((a, b) => b.inspection - a.inspection)
    log(monkeys[0].inspection * monkeys[1].inspection)
})