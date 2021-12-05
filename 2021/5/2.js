const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let nx = 0
    let ny = 0
    input = input.split('\r\n').map(l => {
        const [x1, y1, x2, y2] = l.match(/\d+/g).map(Number)

        if(x1 >= nx) nx = x1 + 1
        if(y1 >= ny) ny = y1 + 1
        if(x2 >= nx) nx = x2 + 1
        if(y2 >= ny) ny = y2 + 1

        return { x1, y1, x2, y2 }
    })
    // log(input)

    const map = []
    for(let y = 0; y < ny; y++) map.push(new Array(nx).fill(0))

    input.forEach(({x1, x2, y1, y2}, i) => {
        if(y1 === y2) {
            let [minX, maxX] = [x1, x2]
            if(maxX < minX) [minX, maxX] = [maxX, minX]
            for(let x = minX; x <= maxX; x++) map[y1][x]++
        }
        else if(x1 === x2) {
            let [minY, maxY] = [y1, y2]
            if(maxY < minY) [minY, maxY] = [maxY, minY]
            for(let y = minY; y <= maxY; y++) map[y][x1]++
        }
        else {
            // diagonales
            const diffX = x2 - x1
            const diffY = y2 - y1
            for(let i = 0; i <= Math.abs(diffX); i++) {
                let x = x1 + i * Math.sign(diffX)
                let y = y1 + i * Math.sign(diffY)
                map[y][x]++
            }
        }
    })

    //console.log(map.map(l => l.join('')).join('\r\n'))

    console.log(map.flat().join('').match(/[^01\r\n]/g).length)
})