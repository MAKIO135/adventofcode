const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

Array.prototype.count = function(a) { 
    return this.filter(d => d === a).length
}

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n').map(l => l.split('').map(Number))
    //log(input)

    const lowPoints = []
    const map = []
    for(let y = 0; y < input.length; y++) {
        map.push(new Array(input[0].length).fill('.'))
        for(let x = 0; x < input[0].length; x++) {
            const d = input[y][x]
            if(input[y-1]?.[x] !== undefined && (input[y-1][x] <= d)) continue;
            if(input[y+1]?.[x] !== undefined && (input[y+1][x] <= d)) continue;
            if(input[y]?.[x-1] !== undefined && (input[y][x-1] <= d)) continue;
            if(input[y]?.[x+1] !== undefined && (input[y][x+1] <= d)) continue;
            lowPoints.push({x,y,d})
            map[y][x] = lowPoints.length - 1
        }
    }
    //log(lowPoints.reduce((acc, {d}) => acc + (d + 1), 0))

    const checkNeigbours = ({x,y,d}, i) => {
        if(map[y-1]?.[x] === '.' && input[y-1][x] < 9 && input[y-1][x] > d) {
            map[y-1][x] = i
            checkNeigbours({x, y: y - 1, d: input[y-1][x]}, i)
        }
        if(map[y+1]?.[x] === '.' && input[y+1][x] < 9 && input[y+1][x] > d) {
            map[y+1][x] = i
            checkNeigbours({x, y: y + 1, d: input[y+1][x]}, i)
        }
        if(map[y]?.[x-1] === '.' && input[y][x-1] < 9 && input[y][x-1] > d) {
            map[y][x-1] = i
            checkNeigbours({x: x - 1, y, d: input[y][x-1]}, i)
        }
        if(map[y]?.[x+1] === '.' && input[y][x+1] < 9 && input[y][x+1] > d) {
            map[y][x+1] = i
            checkNeigbours({x: x + 1, y, d: input[y][x+1]}, i)
        }
    }
    lowPoints.forEach(checkNeigbours)
    //log(map.map(l => l.join(' ')).join('\r\n'))

    const basins = lowPoints.map((d, i) => map.flat().count(i)).sort((a, b) => b - a)
    //log(basins)
    log(basins[0] * basins[1] * basins[2])
})