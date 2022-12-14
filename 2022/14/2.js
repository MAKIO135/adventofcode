const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let maxY = -Infinity
    input = input.split('\n').map(l => l.split(' -> ').map(c => c.split(',').map((n, i) => {
            n = parseInt(n)
            if(i === 1)  maxY = Math.max(maxY, n)
            return n
        })))
    
    const ny = maxY + 1 + 2
    const start = { x: 500, y: 0 }
    const minX = start.x - ny
    const maxX = start.x + ny
    const nx = maxX - minX + 1
    start.x -= minX

    const map = Array(ny).fill(0).map(d => Array(nx).fill('.'))
    input.forEach(l => {
        for(let i = 0; i < l.length - 1; i++) {
            const from = l[i]
            const to = l[i + 1]
            const [x1, x2] = [from[0], to[0]].sort((a, b) => a - b).map(x => x - minX)
            const [y1, y2] = [from[1], to[1]].sort((a, b) => a - b)
            for(let y = y1; y <= y2; y++){
                for(let x = x1; x <= x2; x++){
                    map[y][x] = '#'
                }
            }
        }
    })

    map[start.y][start.x] = '+'
    map[ny-1] = map[ny-1].map(d => '#')

    const isSourceBlocked = (x, y) => x === start.x && y === start.y
    const isMapFree = (x, y) => map[y][x] === '.'
    
    let sand = { ... start }
    let sourceIsBlocked = false
    while(!sourceIsBlocked){
        if(isMapFree(sand.x, sand.y+1)) {
            sand.y++
        }
        else if(isMapFree(sand.x - 1, sand.y + 1)) {
            sand.x -= 1
            sand.y++
        }
        else if(isMapFree(sand.x + 1, sand.y + 1)) {
            sand.x++
            sand.y++
        }
        else {
            map[sand.y][sand.x] = 'o'
            if(isSourceBlocked(sand.x, sand.y)) sourceIsBlocked = true
            sand = { ...start }
        }
    }

    // log(map.map(l => l.join('')).join('\n'))
    log(map.join('').match(/o/g).length)
})