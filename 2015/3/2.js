const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const directions = input.split('')
    const santa = { x: 0, y: 0 }
    const roboSanta = { x: 0, y: 0 }
    const positions = [`${santa.x}|${santa.y}`]
    directions.forEach((d, i) => {
        let pos = i % 2 ? santa : roboSanta
        switch(d) {
            case '^':
                pos.y ++
                break
            case 'v':
                pos.y --
                break
            case '>':
                pos.x ++
                break
            case '<':
                pos.x --
                break
        }
        positions.push(`${pos.x}|${pos.y}`)
    })
    
    log(new Set(positions).size)
})