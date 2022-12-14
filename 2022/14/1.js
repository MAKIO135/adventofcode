const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity
    input = input.split('\n').map(l => l.split(' -> ').map(c => c.split(',').map((n, i) => {
            n = parseInt(n)
            if(i === 0) {
                minX = Math.min(minX, n)
                maxX = Math.max(maxX, n)
            }
            else {
                minY = Math.min(minY, n)
                maxY = Math.max(maxY, n)
            }
            return n
        })))
    
    // log(input)
    // log({minX, maxX, minY, maxY})

    const ny = maxY + 1
    const nx = maxX - minX + 1
    // log({nx, ny})

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

    const start = {
        x: 500 - minX,
        y: 0,
    } 
    map[start.y][start.x] = '+'
    log(map.map(l => l.join('')).join('\n'))

    const intoTheVoid = (x, y) => x < 0 || x >= nx || y >= ny
    const isMapFree = (x, y) => map[y][x] === '.'

    let sand = { ... start }

    while(!intoTheVoid(sand.x, sand.y)){
        if(!intoTheVoid(sand.x, sand.y+1)) {
            if(isMapFree(sand.x, sand.y+1)) {
                sand.y++
            }
            else if(!intoTheVoid(sand.x-1, sand.y+1)) {
                if(isMapFree(sand.x - 1, sand.y + 1)) {
                    sand.x -= 1
                    sand.y++
                }
                else if(!intoTheVoid(sand.x+1, sand.y+1)) {
                    if(isMapFree(sand.x + 1, sand.y + 1)) {
                        sand.x++
                        sand.y++
                    }
                    else {
                        map[sand.y][sand.x] = 'o'
                        // log(map.map(l => l.join('')).join('\n'))
                        sand = { ...start }
                    }
                }
                else {
                    sand.x -= 1
                    sand.y++
                }
            }
            else {
                sand.x -= 1
                sand.y++
            }
        }
        else {
            sand.y++
        }
    }

    log(map.map(l => l.join('')).join('\n'))
    log(map.join('').match(/o/g).length)
})