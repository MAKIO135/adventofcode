const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let head = {
        x: 0, 
        y: 0,
    }

    let tail = {
        x: 0, 
        y: 0,
    }

    input = input.split('\n').map(l => {
        let [dir, n] = l.split(' ')
        n = parseInt(n)

        return dir === 'R' ? {n, x: 1, y: 0} : 
            dir === 'L' ? {n, x: -1, y: 0} : 
            dir === 'U' ? {n, x: 0, y: 1} : 
            dir === 'D' ? {n, x: 0, y: -1} :
            undefined 
    })

    const positions = ['0-0']
    input.forEach(move => {
        // log('-'.repeat(10))
        // log(move)

        for(let i = 0; i < move.n; i ++) {
            // let map = new Array(5).fill(0).map(l => '......'.split(''))

            head.x += move.x
            head.y += move.y

            if(Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
                if(head.x === tail.x || head.y === tail.y) {
                    tail.x += move.x
                    tail.y += move.y
                }
                else {
                    tail.x = head.x - move.x
                    tail.y = head.y - move.y
                }
                positions.push(`${tail.x}-${tail.y}`)
            }
    
            // positions.forEach(pos => {
            //     const [x, y] = pos.split('-').map(d => parseInt(d))
            //     map[y][x] = '#'
            // })
            // map[0][0] = 's'
            // map[tail.y][tail.x] = 'T'
            // map[head.y][head.x] = 'H'
    
            // log(map.map(l => l.join('')).reverse().join('\n'), '\n')
        }
    })
    
    log([...new Set(positions)].length)
})