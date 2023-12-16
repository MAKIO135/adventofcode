const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(l => l.split(''))
    const nx = input[0].length
    const ny = input.length

    
    const tiltNorth = () => {
        for(let x = 0; x < nx; x ++) {
            for(let y = 0; y < ny; y ++) {
                if(input[y][x] !== 'O') continue;
                let p = y
                while(p - 1 >= 0 && input[p-1][x] === '.') {
                    input[p][x] = '.'
                    input[p-1][x] = 'O'
                    p -= 1
                }
            }
        }
    }
    const tiltSouth = () => {
        for(let x = 0; x < nx; x ++) {
            for(let y = ny - 1; y >= 0; y --) {
                if(input[y][x] !== 'O') continue;
                let p = y
                while(p + 1 < ny && input[p+1][x] === '.') {
                    input[p][x] = '.'
                    input[p+1][x] = 'O'
                    p += 1
                }
            }
        }
    }
    const tiltWest = () => {
        for(let y = 0; y < ny; y ++) {
            for(let x = 0; x < nx; x ++) {
                if(input[y][x] !== 'O') continue;
                let p = x
                while(p - 1 >= 0 && input[y][p-1] === '.') {
                    input[y][p] = '.'
                    input[y][p-1] = 'O'
                    p -= 1
                }
            }
        }
    }
    const tiltEast = () => {
        for(let y = 0; y < ny; y ++) {
            for(let x = nx - 1; x >= 0; x --) {
                if(input[y][x] !== 'O') continue;
                let p = x
                while(p + 1 < nx && input[y][p+1] === '.') {
                    input[y][p] = '.'
                    input[y][p+1] = 'O'
                    p += 1
                }
            }
        }
    }

    const N = 1000000000
    const memoCache = new Map()
    let memoKey
    for(let i = 0; i < N; i ++) {
        memoKey = input.map(l => l.join('')).join('|')
        if (memoCache.has(memoKey)) break;

        [tiltNorth, tiltWest, tiltSouth, tiltEast].forEach(d => d())

        memoCache.set(memoKey, 1)

        if(i < 3) {
            log(`After ${i + 1} cycle${i>0?'s':''}:`)
            log(input.map(l => l.join('')).join('\n'))
            log()
        }
    }

    let keys = [...memoCache.keys()]
    let loopStart = keys.indexOf(memoKey) // start of loop
    let loopLen = memoCache.size - loopStart// end of Loop
    let n = loopStart + ((N - loopStart) % loopLen)
    
    const load = keys[n].split('|').map(l => l.split('')).flat().reduce((acc, c, i) => {
        if(c !== 'O') return acc
        const y = i / nx | 0
        return acc + ny - y
    }, 0)
    log(load)
})