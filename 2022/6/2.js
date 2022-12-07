const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(l => {
        let index = 0
        let marker = l.substr(index, 14).split('')
        index = 13

        while([...new Set(marker)].length !== 14) {
            index++
            marker.shift()
            marker.push(l[index])
        }
        return index + 1
    })
    
    log(input)
})