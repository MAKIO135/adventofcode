const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const sortedString = s => s < s.split('').reverse().join('') ? s : s.split('').reverse().join('')

    const tiles = input.split('\n\n').map(t => {
        let data = t.split('\n')
        const id = parseInt(data.shift().split('Tile ')[1])

        const sides = [
            data[0], // top
            data.map(d => d[d.length - 1]).join(''), // right
            data[data.length - 1].split('').reverse().join(''), // bottom
            data.map(d => d[0]).reverse().join('') // left
        ]
        
        const links = {}
        sides.forEach(side => links[sortedString(side)] = 'none')

        return { id, data, sides, links }
    })
    
    // find adjacent tiles
    tiles.forEach(tile => {
        tiles.filter(t => tile.id !== t.id).forEach(t => {
            Object.keys(t.links).forEach(k => {
                if(tile.links[k] === 'none') tile.links[k] = t.id
            })
        })
        Object.keys(tile.links).forEach(k => {
            if(tile.links[k] === 'none') delete tile.links[k]
        })
    })
    // log(tiles)

    const flipData = data => {
        let d = new Array(data.length).fill(0).map(d => new Array(data.length))
        for(let i = 0; i < data.length; i ++) for(let j = 0; j < data.length; j ++) d[i][data.length - j] = data[i][j]
        return d.map(d => d.join(''))
    }

    const flip = tile => {
        tile.data = flipData(tile.data)
        tile.sides = [
            tile.data[0], // top
            tile.data.map(d => d[d.length - 1]).join(''), // right
            tile.data[tile.data.length - 1].split('').reverse().join(''), // bottom
            tile.data.map(d => d[0]).reverse().join('') // left
        ]
    }

    const rotateData = data => {
        const d = new Array(data.length).fill(0).map(d => new Array(data.length))
        for(let i = 0; i < data.length; i ++) for(let j = 0; j < data.length; j ++) d[j][data.length - i] = data[i][j]
        return d.map(d => d.join(''))
    }

    const rotate = tile => {
        tile.data = rotateData(tile.data)
        tile.sides.unshift(tile.sides.pop())
    }
    
    let mapWidth = undefined
    let index = 0
    let map = new Array(tiles.length).fill(0).map(d => new Array(tiles.length))
    
    // corners have only 2 sides connected
    // take one corner and rotate it until we have it turned with its 2 sides linked on bottom and right
    const first = tiles.filter(t => Object.keys(t.links).length === 2)[0]
    while(!(first.links[sortedString(first.sides[1])] && first.links[sortedString(first.sides[2])])) rotate(first)
    // log(first)

    map[index / mapWidth | 0 || 0][mapWidth ? index % mapWidth : index] = first
    tiles.splice(tiles.findIndex(t => t.id === first.id), 1)
    index ++
    
    let prev = map[0][0]
    while(tiles.length) {
        // find from top if first of row else from left
        const fromTop = index % mapWidth === 0
        let prevSide = fromTop ? prev.sides[2] : prev.sides[1]
        prevSide = prevSide.split('').reverse().join('')
        // log({index, fromTop, prevSide})
        
        let tile = tiles.find(t => t.id === prev.links[sortedString(prevSide)])
        
        if(!mapWidth && Object.keys(tile.links).length === 2) mapWidth = index + 1
        
        // orient new tile 
        if(!tile.sides.includes(prevSide)) flip(tile)

        let r = 0
        if(fromTop) while(tile.sides[0] !== prevSide) rotate(tile)
        else while(tile.sides[3] !== prevSide) rotate(tile)
        // log(tile)
        
        map[index / mapWidth | 0 || 0][mapWidth ? index % mapWidth : index] = tile
        tiles.splice(tiles.findIndex(t => t.id === tile.id), 1)

        if(!mapWidth || (index + 1) % mapWidth !== 0) prev = tile
        else prev = map[index / mapWidth | 0 || 0][0]

        index ++
    }
    map = map.map(l => l.filter(t => t)).filter(l => l.length)
    // log(map.map(r => r.map(t => t.id).join('\t')).join('\n'))
    
    const tileSize = map[0][0].data[0].length
    map = map.map(r => r[0].data.map((d,i) => r.map(t => t.data[i].split('').filter((l, j) => j !== 0 && j !== tileSize - 1).join('')).join('')).filter((s, k) => k !== 0 && k !== tileSize - 1).join('\n')).join('\n').split('\n')
    const mapSize = map.length

    const monster = [
        '                  # ',
        '#    ##    ##    ###',
        ' #  #  #  #  #  #   '
    ].map(l => l.split(''))

    const searchMonster = () => {
        let monsterFound = false
        for(let y = 0; y < mapSize - monster.length; y ++) {
            for(let x = 0; x < mapSize - monster[0].length; x ++) {
                let canSeeMonster = true
                for(let yy = 0; yy < monster.length; yy ++) {
                    for(let xx = 0; xx < monster[0].length; xx ++) {
                        if(monster[yy][xx] === '#' && map[y + yy][x + xx] !== '#') canSeeMonster = false
                    }
                }
                if(canSeeMonster) {
                    monsterFound = true
                    for(let yy = 0; yy < monster.length; yy ++) {
                        let line = map[y + yy].split('')
                        for(let xx = 0; xx < monster[0].length; xx ++) {
                            if(monster[yy][xx] === '#') {
                                line[x + xx] = 'O'
                            }
                        }
                        map[y + yy] = line.join('')
                    }
                }
            }
        }
        return monsterFound
    }

    let test = 0
    while(!searchMonster()) {
        map = rotateData(map)
        test++
        if(test % 4 === 0) map = flipData(map)
    }

    map = map.join('\n')
    log(map)
    log(map.match(/\#/g).length)
})