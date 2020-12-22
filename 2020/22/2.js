const fs = require('fs')
const { clear, log } = require('console')
const { start } = require('repl')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const [deck1, deck2] = input.split('\n\n').map(data => data.split('\n').filter((d, i) => i > 0).map(d => parseInt(d)))
    // log({ deck1, deck2 })
    
    let nGame = 1
    const recursiveCombat = (deck1, n1, deck2, n2, gameID = 1) => {
        // log(`\n=== Game ${gameID} ===`)
        const prevs = { deck1: [], deck2: [] }
        const [d1, d2] = [[...deck1.filter((d, i) => i < n1)], [...deck2.filter((d, i) => i < n2)]]

        const playRound = (round = 1) => {
            // log(`\n-- Round ${round} (Game ${gameID}) --`)
            const config1 = d1.join(',')
            const config2 = d2.join(',')
            if(prevs.deck1.includes(config1) || prevs.deck2.includes(config2)) return 1
    
            prevs.deck1.push(config1)
            prevs.deck2.push(config2)
            // log(`Player 1's deck': ${d1.join(', ')}`)
            // log(`Player 2's deck': ${d2.join(', ')}`)
            
            const card1 = d1.shift()
            const card2 = d2.shift()
            // log(`Player 1 plays: ${card1}`)
            // log(`Player 2 plays: ${card2}`)
            
            let winner
            if(d1.length >= card1 && d2.length >= card2) {
                // log(`Playing a sub-game to determine the winner...`)
                winner = recursiveCombat(d1, card1, d2, card2, ++nGame).winner
                // log(`\n...anyway, back to game ${gameID}.`)
            }
            else if(card1 > card2) winner = 1
            else if(card2 > card1) winner = 2

            // log(`Player ${winner} wins round ${round} of game ${gameID}!`)
            if(winner === 1) d1.push(card1, card2)
            if(winner === 2) d2.push(card2, card1)

            if(d1.length === 0) return 2
            if(d2.length === 0) return 1

            return playRound(round + 1)
        }

        let winner
        while(d1.length && d2.length && !winner) winner = playRound()
        // log(`The winner of game ${gameID} is player ${winner}!`)
        return { winner, deck: winner === 1 ? d1 : d2 }
    }
    const { winner, deck } = recursiveCombat(deck1, deck1.length, deck2, deck2.length)
    // log({ winner, deck: deck.join(', ') })
    
    log(deck.reduce((acc, curr, i, arr) => acc + curr * (arr.length - i), 0))
})