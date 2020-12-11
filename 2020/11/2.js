console.clear()
const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\n')

    const directions = [
        [-1, -1], [ 0, -1], [ 1, -1],
        [-1,  0],           [ 1,  0],
        [-1,  1], [ 0,  1], [ 1,  1],
    ].map(d => ({ x: d[0], y: d[1] }))

    const findFirstSeat = (room, pos, dir) => {
        let seat, isInside = true

        while(isInside && !seat) {
            if(pos.x + dir.x < 0 || pos.x + dir.x >= room[0].length || 
             pos.y + dir.y < 0 || pos.y + dir.y >= room.length) {
                isInside = false
                break
            }
            
            pos.x += dir.x
            pos.y += dir.y
            if(room[pos.y][pos.x] !== '.') seat = room[pos.y][pos.x]
        }
        return !isInside ? 0 : seat === '#' ? 1 : 0
    }

    const computeNext = room => {
        const next = new Array(room.length).fill('.').map(d => new Array(room[0].length).fill('.'))
        
        for(let y = 0; y < room.length; y++) {
            for(let x = 0; x < room[0].length; x++) {
                const seat = room[y][x]
                if(seat === '.') continue; // floor never changes
                
                // count neighbours
                const n = directions.reduce((acc, dir) => acc + findFirstSeat(room, { x, y }, dir), 0)
                if(seat === 'L' && n === 0) next[y][x] = '#'
                else if(seat === '#' && n >= 5) next[y][x] = 'L'
                else next[y][x] = seat
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