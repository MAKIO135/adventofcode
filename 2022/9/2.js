const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(l => {
        let [dir, n] = l.split(' ')
        n = parseInt(n)

        return dir === 'R' ? {n, x: 1, y: 0} : 
            dir === 'L' ? {n, x: -1, y: 0} : 
            dir === 'U' ? {n, x: 0, y: 1} : 
            dir === 'D' ? {n, x: 0, y: -1} :
            undefined 
    })

    // const knots = new Array(10).fill(0).map(d => ({ x: 0, y: 0 }))
    const knots = new Array(10).fill(0).map(d => ({ x: 11, y: 5 }))
    const positions = [`${knots[0].x}-${knots[0].y}`]

    const logMap = () => {
        // let map = new Array(5).fill(0).map(l => '.'.repeat(5).split(''))
        let map = new Array(21).fill(0).map(l => '..........................'.split(''))
        positions.forEach(pos => {
            const [x, y] = pos.split('-').map(d => parseInt(d))
            map[y][x] = '#'
        })
        knots.forEach((k, j) => {
            try{map[k.y][k.x] = j === 0 ? 'H' : map[k.y][k.x] === '.' ? j : map[k.y][k.x]}
            catch(e) {log(k.x, k.y)}
        })

        map[knots[0].y][knots[0].x] = map[knots[0].y][knots[0].x] === '.' ? 's' : map[knots[0].y][knots[0].x]

        log(map.map(l => l.join('')).reverse().join('\n'), '\n')
    }

    // logMap()

    input.forEach(move => {
        // log('-'.repeat(10))
        // log(move)
        let originalMove = {
            n: move.n,
            x: move.x,
            y: move.y,
        }

        for(let i = 0; i < move.n; i ++) {
            knots[0].x += move.x
            knots[0].y += move.y

            for(let j = 1; j < knots.length; j++) {
                // if their distance > 1
                if(Math.abs(knots[j - 1].x - knots[j].x) > 1 || Math.abs(knots[j - 1].y - knots[j].y) > 1) {

                    // if knots are aligned
                    if(knots[j].x === knots[j - 1].x) {
                        knots[j].y += (knots[j - 1].y - knots[j].y)/2
                    }
                    else if(knots[j].y === knots[j - 1].y) {
                        knots[j].x += (knots[j - 1].x - knots[j].x)/2
                    }
                    else {
                        knots[j].x += knots[j].x < knots[j - 1].x ? 1 : -1
                        knots[j].y += knots[j].y < knots[j - 1].y ? 1 : -1
                    }

                    if(j === knots.length - 1) positions.push(`${knots[j].x}-${knots[j].y}`)

                    // logMap()
                }
            }
            move = originalMove

        }
        // logMap()
    })
    
    // let map = new Array(5).fill(0).map(l => '.....'.split(''))
    // let map = new Array(21).fill(0).map(l => '..........................'.split(''))
    // positions.forEach(pos => {
    //     const [x, y] = pos.split('-').map(d => parseInt(d))
    //     map[y][x] = '#'
    // })
    // log(map.map(l => l.join('')).reverse().join('\n'), '\n')
    log([...new Set(positions)].length)
})