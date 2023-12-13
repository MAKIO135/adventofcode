const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const manDist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    // expand universe
    //vertically
    input = input.split('\n')
    let galaxies = input.map((l, i) => [...l.matchAll(/#/g)]).map((l, y) => l.map(g => ({x: g.index, y}))).flat()
    // log(galaxies)

    let galaxiesX = galaxies.map(g => g.x)
    let galaxiesY = galaxies.map(g => g.y)

    const emptyCols = new Array(input[0].length).fill(0)
        .map((d, i) => i)
        .filter(i => galaxiesX.indexOf(i)<0)
    // log(emptyCols)

    const emptyRows = new Array(input.length).fill(0)
        .map((d, i) => i)
        .filter(i => galaxiesY.indexOf(i)<0)
    // log(emptyRows)

    const gDist = (a, b) => {
        let d = manDist(a, b)
        emptyCols.forEach(c => {
            let [x1, x2] = [a.x, b.x].sort((a, b) => a - b)
            if(c > x1 && c < x2) d += 1000000 - 1
        })
        emptyRows.forEach(c => {
            let [y1, y2] = [a.y, b.y].sort((a, b) => a - b)
            if(c > y1 && c < y2) d += 1000000 - 1
        })
        return d
    }

    // log(gDist(galaxies[0], galaxies[1]))

    let totalDist = 0
    for(let i = 0; i < galaxies.length - 1; i ++) {
        for(let j = i+1; j < galaxies.length; j ++) {
            totalDist += gDist(galaxies[i], galaxies[j])
        }
    }
    log(totalDist)
})