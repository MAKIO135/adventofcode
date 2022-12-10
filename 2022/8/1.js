const fs = require('fs')
const { clear, log } = require('console')
const { arrayBuffer } = require('stream/consumers')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
    let ny = input.length
    let nx = input[0].length

    let map = new Array(ny).fill(0).map(() => new Array(nx).fill('.'))

    for(let y = 0; y < ny; y ++) {
        //from left
        const line = input[y]
        map[y][0] = 'x'
        let size = input[y][0]
        for(let x = 1; x < nx - 1; x ++) {
            if(line[x] > size) {
                map[y][x] = 'x'
                size = input[y][x]
            }
        }

        //from right
        map[y][nx-1] = 'x'
        size = input[y][nx-1]
        for(let x = nx-2; x > 0; x --) {
            if(line[x] > size) {
                map[y][x] = 'x'
                size = input[y][x]
            }
        }
    }

    for(let x = 1; x < nx - 1; x ++) {
        //from top
        map[0][x] = 'x'
        let size = input[0][x]
        for(let y = 1; y < ny; y ++) {
            if(input[y][x] > size) {
                map[y][x] = 'x'
                size = input[y][x]
            }
        }

        //from bottom
        map[ny-1][x] = 'x'
        size = input[ny-1][x]
        for(let y = ny-1; y > 0; y --) {
            if(input[y][x] > size) {
                map[y][x] = 'x'
                size = input[y][x]
            }
        }
    }
 
    log(map.map(l => l.join('')).join('\n'))
    log(map.map(l => l.join('')).join('\n').split('').filter(d => d === 'x').length)
})