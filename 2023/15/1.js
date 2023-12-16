const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const hash = s => {
        return s.split('').reduce((acc, c, i) => (acc + c.charCodeAt(0)) * 17 % 256, 0)
    }

    log(input.split(',').map(s => hash(s)).reduce((acc, d) => acc + d))
})