const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err

    const tiles = input.split('\n\n').map(t => {
        const data = t.split('\n')
        const id = parseInt(data.shift().split('Tile ')[1])

        const sides = {}
        const sortedString = s => s < s.split('').reverse().join('') ? s : s.split('').reverse().join('')

        sides[sortedString(data[0])] = new Set()
        sides[sortedString(data[data.length - 1])] = new Set()
        sides[sortedString(data.map(d => d[0]).join(''))] = new Set()
        sides[sortedString(data.map(d => d[d.length - 1]).join(''))] = new Set()

        return { id, sides }
    })
    
    // find adjacent tiles
    tiles.forEach(tile => {
        tiles.filter(t => tile.id !== t.id).forEach(t =>{
            Object.keys(t.sides).forEach(k => tile.sides[k] ? tile.sides[k].add(t.id) : 0)
        })
    })

    // corners have only 2 sides connected
    const corners = tiles.filter(t => Object.values(t.sides).filter(set => set.size > 0).length === 2)
    log(corners.reduce((acc, curr) => acc * curr.id, 1))
})