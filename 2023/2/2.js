const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
        .map(line => {
            let [game, sets] = line.split(':')
            sets = sets.split(';').map(set => {
                let red = set.match(/(\d+) red/)
                red = red ? red[1] : 0
                let green = set.match(/(\d+) green/)
                green = green ? green[1] : 0
                let blue = set.match(/(\d+) blue/)
                blue = blue ? blue[1] : 0

                return [red, green, blue]
            })
            
            let minRed = Math.max(...sets.map(set => set[0]))
            let minGreen = Math.max(...sets.map(set => set[1]))
            let minBlue = Math.max(...sets.map(set => set[2]))

            return minRed * minGreen * minBlue
        })
        .reduce((acc,d) => acc + d)

    
    log(input)
})