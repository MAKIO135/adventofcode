// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
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
    const player2 = {
        X: 0,
        Y: 1,
        Z: 2,
    }
    input = input
        .split('\n').map(l => l.split(' '))
        .map(d => {
            const res = (
                player1[d[0]] === (player2[d[1]] + 1) % 3 ? 0 : // loss
                player1[d[0]] === player2[d[1]] ? 3 : // draw
                6 // victory
            )
            const choice = player2[d[1]] + 1
            log(d, choice, res)
            return res + choice
        })
    
    log(input.reduce((a,d) => a + d))
})