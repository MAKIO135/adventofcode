const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const cardsOrder = 'AKQJT98765432'.split('')
    const reversedOrder = [...cardsOrder].reverse()

    input = input.split('\n').map(l => {
        let [hand, bid] = l.split(' ')
        bid = parseInt(bid)
        let counts = [...new Set(hand.split(''))].map(c => ({
            card: c, 
            n :[...hand.matchAll(c)].length|0
        })).sort((a, b) => (a.n * 100 + reversedOrder.indexOf(a.card)) - (b.n * 100 + reversedOrder.indexOf(b.card))).reverse()

        return {hand, bid, counts}
    }).sort((a, b) => {
        let figure = a.counts[0].n - b.counts[0].n
        if(figure !== 0) return figure

        figure = a.counts[1].n - b.counts[1].n
        if(figure !== 0) return figure

        for(let i = 0; i < 5; i++ ){
            let compare = reversedOrder.indexOf(a.hand[i]) - reversedOrder.indexOf(b.hand[i])
            if(compare !== 0) return compare
        }
    })
    
    log(input.reduce((acc, d, i) => acc + d.bid * (i + 1), 0))
})