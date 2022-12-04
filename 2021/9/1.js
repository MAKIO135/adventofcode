const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n').map(l => l.split('').map(Number))
    //log(input)

    const lowPoints = []

    for(let y = 0; y < input.length; y++) {
        for(let x = 0; x < input[0].length; x++) {
            const d = input[y][x]
            if(input[y-1]?.[x] !== undefined && (input[y-1][x] <= d)) continue;
            if(input[y+1]?.[x] !== undefined && (input[y+1][x] <= d)) continue;
            if(input[y]?.[x-1] !== undefined && (input[y][x-1] <= d)) continue;
            if(input[y]?.[x+1] !== undefined && (input[y][x+1] <= d)) continue;
            lowPoints.push({x,y,d})
        }
    }
    console.log(lowPoints.reduce((acc, {d}) => acc + (d + 1), 0))
})