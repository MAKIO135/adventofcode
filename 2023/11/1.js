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
    let galaxies = input.map((l, i) => [...l.matchAll(/#/g)])
    
    const galaxiesX = []
    galaxies.forEach((l, i) => {
        if(!l.length) input[i] = [input[i], input[i]]
        else l.forEach(g => galaxiesX.push(g.index))
    })
    input = input.flat().map(l => l.split(''))

    //horizontally
    new Array(input[0].length).fill(0)
        .map((d, i) => i)
        .filter(i => galaxiesX.indexOf(i)<0)
        .sort((a, b) => b - a)
        .forEach(i => input.forEach(l => l.splice(i, 0, '.')))
    
    galaxies = input.map((l, i) => [...l.join('').matchAll(/#/g)]).map((l, y) => l.map(g => ({x:g.index, y}))).flat()

    let totalDist = galaxies.reduce((acc, g, i) => acc + galaxies.reduce((acc2, f, j) => acc2 + (j>i ? manDist(f, g) : 0), 0), 0)
    log(totalDist)
})