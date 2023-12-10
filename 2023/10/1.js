const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    const pipes = {}
    pipes['|'] = (pipeX, pipeY, x, y) => y === pipeY + 1 || y === pipeY - 1
    pipes['-'] = (pipeX, pipeY, x, y) => x === pipeX + 1 || x === pipeX - 1
    pipes['L'] = (pipeX, pipeY, x, y) => y === pipeY - 1 || x === pipeX + 1
    pipes['J'] = (pipeX, pipeY, x, y) =>  y === pipeY - 1 || x === pipeX - 1
    pipes['7'] = (pipeX, pipeY, x, y) =>  y === pipeY + 1 || x === pipeX - 1
    pipes['F'] = (pipeX, pipeY, x, y) =>  y === pipeY + 1 || x === pipeX + 1
    pipes['.'] = () => false
    pipes['S'] = () => false

    input  = input.split('\n').map(l => l.split(''))
    
    const positions = []
    let y  = input.findIndex(l => l.includes('S'))
    let x  = input[y].findIndex(c => c === 'S')
    positions.push({x, y})

    const getNeighbors = ({x, y}, pipe) => 
        pipe === '|' ? [{x, y: y-1}, {x, y: y+1}] : 
        pipe === '-' ? [{x: x-1, y}, {x: x+1, y}] : 
        pipe === 'L' ? [{x: x+1, y}, {x, y: y-1}] : 
        pipe === 'J' ? [{x: x-1, y}, {x, y: y-1}] : 
        pipe === '7' ? [{x: x-1, y}, {x, y: y+1}] : 
        pipe === 'F' ? [{x: x+1, y}, {x, y: y+1}] : 
        pipe === 'S' ? [{x: x-1, y}, {x: x+1, y}, {x, y: y-1}, {x, y: y+1}] : 
        []

    let next
    do {
        let pos = positions[positions.length -1]
        const neighbors = getNeighbors(pos, input[pos.y][pos.x])
        next = neighbors.find(({x, y}) => x>=0 && x < input[0].length &&
        y >= 0 && y < input.length &&
        (!positions.some(p => p.x === x && p.y === y)) && 
        pipes[input[y][x]](x, y, pos.x, pos.y))
        if(next) positions.push(next)
    } while(next)

    log(positions.length/2)
})