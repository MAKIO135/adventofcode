const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err

    const rocks = fs.readFileSync('./rocks',
    {encoding:'utf8', flag:'r'})
        .split('\n\n').map(d => d.split('\n').map(l => l.split('')))

    let rockId = 0
    const w = 7
    const startX = 2
    let maxY = 0
    let startY = maxY + 3

    input = input.split('').map(c => c === '>' ? 1 : -1)

    
    // rock start at x=2 y=maxY+3
    // jet stream > or < in walls
    // down 1 if possible or (rest and new rock at ++rockId % rocks.length)

    log(input)
})