const { log, clear } = require('console')
clear()
log('/'.repeat(100))
const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    input = input.split('\n').map(l => l.split(''))

    let map = {}
    for(let y = 0; y < input.length; y++) {
        for(let x = 0; x < input[y].length; x ++) {
            if(input[y][x] === '#') map[`${x}|${y}|${0}`] = 1
        }
    }

    const adjacents = (x, y, z, f) => {
        for(let zz = z - 1; zz <= z + 1; zz++) {
            for(let yy = y - 1; yy <= y + 1; yy++) {
                for(let xx = x - 1; xx <= x + 1; xx++) {
                    if(zz !== z || yy !== y || xx !== x) f(xx, yy, zz)
                }
            }
        }
    }

    for(let cycle = 0; cycle < 6; cycle++) {
        let next = {}

        // for each active block
        Object.keys(map).forEach(key => {
            let [x, y, z] = key.split('|').map(d => parseInt(d))

            let neighbours = 0
            // for each adjacent block
            adjacents(x, y, z, (xx, yy, zz) => {
                if(map[`${xx}|${yy}|${zz}`]) neighbours++

                let neighbours2 = 0
                adjacents(xx, yy, zz, (xxx, yyy, zzz) => {
                    if(map[`${xxx}|${yyy}|${zzz}`]) neighbours2++
                })
                
                if((map[`${xx}|${yy}|${zz}`] && (neighbours2 === 2 || neighbours2 === 3)) || 
                (!map[`${xx}|${yy}|${zz}`] && neighbours2 === 3)) next[`${xx}|${yy}|${zz}`] = 1
                else delete next[`${xx}|${yy}|${zz}`]
            })
                
            if(neighbours === 2 || neighbours === 3) next[`${x}|${y}|${z}`] = 1
            else delete next[`${x}|${y}|${z}`]
        })

        map = { ...next }
    }
    
    log(Object.keys(map).length)
})