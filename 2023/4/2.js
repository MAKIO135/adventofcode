const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    
    const cards = input.split('\n').map(l => {
        let [cardID, numbers] = l.split(': ')
        cardID = parseInt(cardID.match(/\d+/)[0])
        const [winningNumbers, numbersYouHave] = numbers.split(' | ').map(d => [...d.matchAll(/\d+/g)].map(d => parseInt(d[0])).sort((a,b) => a - b))
        const winningNumbersYouHave = winningNumbers.filter(d => numbersYouHave.includes(d))
        const cardsWon = winningNumbersYouHave.map((d, i) => cardID + i + 1)
        return {cardID, cardsWon, n: 1}
    })

    const getCards = id => {
        cards[id - 1].cardsWon.forEach(d => {
            cards[d - 1].n ++
            getCards(d)
        })
    }
    cards.forEach(c => getCards(c.cardID))

    const nbCards = cards.reduce((acc, d) => acc + d.n, 0)

    log(nbCards)
})