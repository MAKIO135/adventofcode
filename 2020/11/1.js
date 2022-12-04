console.clear()
const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')

    const computeNext = curr => {
        const next = new Array(curr.length).fill('.').map(d => new Array(curr[0].length).fill('.'))
        
        for(let y = 0; y < curr.length; y++) {
            const row = curr[y]
            
            for(let x = 0; x < curr.length; x++) {
                const pos = row[x]
                if(pos === '.') continue; // floor never changes
                
                // count neighbours
                let n = 0
                for(let yy = Math.max(0, y - 1); yy <= Math.min(curr.length - 1, y + 1); yy++) {
                    const row2 = curr[yy]

                    for(let xx = Math.max(0, x - 1); xx <= Math.min(row.length - 1, x + 1); xx++) {
                        if(yy === y && xx === x) continue; // avoid self
                        if(row2[xx] === '#') n ++
                    }
                }
                
                if(pos === 'L' && n === 0) next[y][x] = '#'
                else if(pos === '#' && n >= 4) next[y][x] = 'L'
                else next[y][x] = curr[y][x]
            }
        }

        return next.map(d => d.join(''))
    }

    let curr = [...input]
    const step = () => {
        const next = computeNext(curr)
        if(curr.join('') === next.join('')) return next

        curr = [...next]
        return step()
    }
    console.log(step().join('').split('').filter(d => d === '#').length)
})