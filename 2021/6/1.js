const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split(',').map(Number)

    const update = (list) => {
        const next = [...list]
        list.forEach((d, i) => {
            next[i]--
            if(next[i] < 0) {
                next[i] = 6
                next.push(8)
            }
        })
        return next
    }

    for(let i = 1; i <= 80; i++) {
        input = update(input)
    }
    log(input.length)
})