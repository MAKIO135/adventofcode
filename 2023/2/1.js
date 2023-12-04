const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const maxRed = 12
    const maxGreen = 13
    const maxBlue = 14
    input = input.split('\n')
        .map(line => {
            let [game, sets] = line.split(':')
            let gameID = parseInt(game.split(' ')[1])
            sets = sets.split(';').map(set => {
                let red = set.match(/(\d+) red/)
                red = red ? red[1] : 0
                if(red > maxRed) return;
                let green = set.match(/(\d+) green/)
                green = green ? green[1] : 0
                if(green > maxGreen) return;
                let blue = set.match(/(\d+) blue/)
                blue = blue ? blue[1] : 0
                if(blue > maxBlue) return 0;

                return [red, green, blue]
            })
            if(!sets.some(d => !d)) return gameID
            //return [gameID, sets.join('|')]
        })
        .filter(d => d)
        .reduce((acc,d) => acc + d)

    
    log(input)
})