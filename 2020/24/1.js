const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
    
    const tiles = {}
    input.forEach(line => {
        const directions = line.match(/([sn][we]|[we])/g)
        let pos = {x: 0, y: 0}

        directions.forEach(d => {
            switch(d) {
                case 'e':
                    pos.x++
                    break
                case 'w':
                    pos.x--
                    break
                case 'se':
                    pos.y++
                    if(pos.y % 2 === 0) pos.x++
                    break
                case 'sw':
                    pos.y++
                    if(pos.y % 2) pos.x--
                    break
                case 'ne':
                    if(pos.y % 2) pos.x++
                    pos.y--
                    break
                case 'nw':
                    if(pos.y % 2 === 0) pos.x--
                    pos.y--
                    break
            }
            
            // console.log(pos)
        })

        if(tiles[`${pos.x}|${pos.y}`]) delete tiles[`${pos.x}|${pos.y}`]
        else tiles[`${pos.x}|${pos.y}`] = 1
    })

    log(Object.keys(tiles).length)
})