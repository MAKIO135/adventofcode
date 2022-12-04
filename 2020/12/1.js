console.clear()
const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const cmds = input.split('\n').map(d => {
        let [, action, value] = /([A-Z])(\d+)/.exec(d)
        value = parseInt(value)
        return { action, value }
    })
    // console.log(cmds)

    const dirs = [
        [ 1, 0 ], // East 0
        [ 0, -1], // South 1
        [-1, 0 ], // West 2
        [ 0, 1], // North 3
    ]

    let dir = 0 // East
    const pos = [0, 0]

    cmds.forEach(({action, value}) => {
        // console.log({ action, value })
        if(['L', 'R'].includes(action)) {
            dir = (dir + 8 + ((value / 90) * (action === 'L' ? -1 : 1))) % 4
        }
        else if(action === 'F') {
            pos[0] += value * dirs[dir][0]
            pos[1] += value * dirs[dir][1]
        }
        else {
            const index = ['E', 'S', 'W', 'N'].indexOf(action)
            pos[0] += value * dirs[index][0]
            pos[1] += value * dirs[index][1]
        }
    })
    
    console.log({ pos })
    console.log({ manhattan: Math.abs(pos[0]) + Math.abs(pos[1]) })
})