const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const decks = input.split('\n\n').map(data => data.split('\n').filter((d, i) => i > 0).map(d => parseInt(d)))
    
    while(decks[0].length && decks[1].length) {
        const card1 = decks[0].shift()
        const card2 = decks[1].shift()
        if(card1 > card2) decks[0].push(card1, card2)
        else decks[1].push(card2, card1)
    }

    log(decks.flat().reduce((acc, curr, i, arr) => acc + curr * (arr.length - i), 0))
})