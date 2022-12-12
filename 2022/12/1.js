const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const start = {}
    const end = {}
    const elevations = input.split('\n').map((l, y) => l.split('').map((c, x) => {
        if(c === 'S') {
            start.x = x
            start.y = y
            return 0
        }
        else if(c === 'E') {
            end.x = x
            end.y = y
            return 25
        }

        return c.charCodeAt(0)-97
    }))

    // log(elevations.map(l => l.map(d => d.toString().padStart(2, ' ')).join(' ')).join('\n'))
    
    const ny = elevations.length
    const nx = elevations[0].length
    const steps = Array(ny).fill(0).map(d => Array(nx).fill('.'))
    
    let positions = [start]
    steps[start.y][start.x] = 0

    let arrived = false
    while(!arrived) {
        let pos = positions.shift()
        let step = steps[pos.y][pos.x]
        ;[
            {x: pos.x-1, y: pos.y},
            {x: pos.x+1, y: pos.y},
            {x: pos.x, y: pos.y-1},
            {x: pos.x, y: pos.y+1},
        ].forEach(({ x, y }) => {
            if(x < 0 || x >= nx || y < 0 || y >= ny || elevations[y][x] > elevations[pos.y][pos.x] + 1) return;
            if(steps[y][x] !== '.' && steps[y][x] <= step + 1) return;
            
            steps[y][x] = step + 1
            positions.push({ x, y })
            if(x === end.x && y === end.y) arrived = true
        })
    }
    
    // log(steps.map(l => l.map(d => d.toString().padStart(3, ' ')).join(' ')).join('\n'))

    log(steps[end.y][end.x])
})