const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const parsePos = pos => pos.match(/\d+/g).map(d => parseInt(d))

    const instructions = input.split('\n').map(d => {
        let [cmd, from, to] = [...d.matchAll(/([a-z]+(?:\s(?:on|off))?)|(\d+,\d+)/g)].map(e => e[0]).filter(d => d !== 'through')
        from = parsePos(from)
        to = parsePos(to)
        return {cmd, from, to}
    })
    
    const lights = new Array(1000).fill(0).map(d => new Array(1000).fill(0))
    instructions.forEach(({cmd, from, to}) => {
        const [xMin, xMax] = [from[0], to[0]].sort((a, b) => a - b)
        const [yMin, yMax] = [from[1], to[1]].sort((a, b) => a - b)

        for(let y = yMin; y <= yMax; y ++) {
            for(let x = xMin; x <= xMax; x ++) {
                if(cmd === 'toggle') lights[y][x] = 1 - lights[y][x]
                else if(cmd === 'turn on') lights[y][x] = 1
                else if(cmd === 'turn off') lights[y][x] = 0
            }
        }
    })

    log(lights.reduce((acc, l) => acc + l.reduce((acc2, d) => acc2 + d, 0), 0))
})