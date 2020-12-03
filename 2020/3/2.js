const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]
    
    const slopesTrees = slopes.map(([nx, ny]) => {
        const copy = input.split('\n')
        
        let x = 0
        let trees = 0
        for(let y = ny; y <= copy.length - ny; y += ny) {
            const row = copy[y].split('')
            
            x = (x + nx) % row.length
            
            if (row[x] === '#') {
                row[x] = 'X'
                trees ++
            }
            else row[x] = 'O'
            
            copy[y] = row.join('')
        }

        console.log({ nx, ny })
        // console.log(copy.join('\n'))
        console.log(trees)
        console.log('/'.repeat(copy[0].length))
        
        return trees
    })
    
    console.log(slopesTrees)
    console.log(slopesTrees.reduce((acc, d, i) => {
        return i === 0 ? d : acc * d
    }, 0))
})