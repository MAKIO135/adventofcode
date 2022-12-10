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

    const scenicScore = (x, y) => {
        let score = new Array(4).fill(0)
        
        let go = true

        // look left
        go = true
        for(let xx = x-1; xx >=0 && go; xx--) {
            score[0]++
            if(input[y][x] <= input[y][xx]) go = false
        }
        if(score[0] === 0) return 0
        
        // look right
        go = true
        for(let xx = x+1; xx < nx && go; xx++) {
            score[1]++
            if(input[y][x] <= input[y][xx]) go = false
        }
        if(score[1] === 0) return 0
        
        // // look up
        go = true
        for(let yy = y-1; yy >= 0 && go; yy--) {
            score[2]++
            if(input[y][x] <= input[yy][x]) go = false
        }
        if(score[2] === 0) return 0

        // // look down
        go = true
        for(let yy = y+1; yy < ny && go; yy++) {
            score[3]++
            if(input[y][x] <= input[yy][x]) go = false
        }
        if(score[3] === 0) return 0

        return score.reduce((acc, d) => acc * d, 1)
    }

    const bestScenicScore = Math.max(...new Set(Array(ny).fill(0).map((d, y) => Array(nx).fill(0).map((d, x) => (x === 0 || x === nx -1 || y === 0 || y === ny - 1) ? 0 : scenicScore(x, y))).flat()))

    log(bestScenicScore)
})