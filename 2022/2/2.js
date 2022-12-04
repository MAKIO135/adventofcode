// A for Rock, B for Paper, and C for Scissors
// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
// 1 for Rock, 2 for Paper, and 3 for Scissors
// 0 if you lost, 3 if the round was a draw, and 6 if you won

const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    const player1 = {
        A: 0,
        B: 1,
        C: 2,
    }
    const choices = Object.keys(player1)
    const pts = {
        X: 0,
        Y: 3,
        Z: 6,
    }
    input = input
        .split('\n').map(l => l.split(' '))
        .map(d => {
            const choice = d[1] == 'X' ? choices[(player1[d[0]] - 1 + 3) % 3] :
                d[1] == 'Y' ? d[0] :
                choices[(player1[d[0]] + 1) % 3]
            const res = pts[d[1]]
            return res + player1[choice] + 1
        })
    
    log(input.reduce((a,d) => a + d))
})