const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
        .map(l => {
            let [cardID, numbers] = l.split(': ')
            cardID = parseInt(cardID.match(/\d+/)[0])
            const [winningNumbers, numbersYouHave] = numbers.split(' | ').map(d => [...d.matchAll(/\d+/g)].map(d => parseInt(d[0])).sort((a,b) => a - b))
            const winningNumbersYouHave = winningNumbers.filter(d => numbersYouHave.includes(d))
            const pts = winningNumbersYouHave.length ? 2 ** (winningNumbersYouHave.length - 1) : 0
            return {cardID, winningNumbers, numbersYouHave, winningNumbersYouHave, pts}
        })
        .reduce((acc, d) => acc + d.pts, 0)
    
    log(input)
})