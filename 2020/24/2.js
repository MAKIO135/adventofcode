const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let tiles = {}
    
    input.split('\n').forEach(line => {
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
        })

        if(tiles[`${pos.x}|${pos.y}`]) delete tiles[`${pos.x}|${pos.y}`]
        else tiles[`${pos.x}|${pos.y}`] = 1
    })
    
    /*
    ⬢ ⬢ ⬢ ⬢ ⬢ 
     ⬢ ⬢ ⬢ ⬡ ⬢ 
    ⬢ ⬡ ⬢ ⬢ ⬢ 
     ⬢ ⬢ ⬢ ⬢ ⬢ 
    */
    const getNeighbours = pos => [
        { x: pos.x, y: pos.y - 1 }, { x: pos.x + (pos.y % 2 === 0 ? -1 : 1), y: pos.y - 1 },
        { x: pos.x - 1, y: pos.y }, { x: pos.x + 1, y: pos.y },
        { x: pos.x, y: pos.y + 1 }, { x: pos.x + (pos.y % 2 === 0 ? -1 : 1), y: pos.y + 1 },
    ]

    for(let i = 0; i < 100; i++) {
        const next = {}

        Object.keys(tiles).forEach(k => {
            k = k.split('|').map(d => parseInt(d))
            let pos = { x: k[0], y: k[1] }
            let n = 0

            getNeighbours(pos).forEach(pp => {
                let nn = getNeighbours(pp).filter(ppp => tiles[`${ppp.x}|${ppp.y}`]).length

                if(tiles[`${pp.x}|${pp.y}`]) {
                    n++
                    if(!(nn === 0 || nn > 2)) next[`${pp.x}|${pp.y}`] = 1
                }
                else if(nn === 2) next[`${pp.x}|${pp.y}`] = 1
            })

            if(!(n === 0 || n > 2)) next[`${pos.x}|${pos.y}`] = 1
        })

        tiles = next
    }
    log(`Day 100: ${Object.keys(tiles).length}`)
})