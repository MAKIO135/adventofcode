const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n\r\n')
    //log(input)

    let [numbers, ...boards] = input
    numbers = numbers.split(',')
    boards.forEach((b, i) => boards[i] = b.split('\r\n').map(l => l.match(/\d+/g).join(',')).join('\r\n'))
    //log({numbers, boards})
    const nx = boards[0].split('\r\n')[0].match(/\d+/g).length
    const ny = boards[0].split('\r\n').length
    
    const checkRows = board => board.includes('X'.repeat(nx).split('').join(','))
    const checkCols = board => {
        const b = board.split('\r\n').map(l => l.split(',').filter(d => d !== ''))
        let win = false
        for(let i = 0; i < nx && !win; i++) {
            let winCol = true
            for(let j = 0; j < ny && winCol; j++) {
                if(b[j][i] !== 'X') winCol = false
            }
            if(winCol) win = true
        }
        return win
    }
    const isWinningBoard = board => checkRows(board) || checkCols(board)

    let winner = undefined
    for (let i = 0; i < numbers.length && winner === undefined; i++) {
        const nb = numbers[i]
        for (let j = 0; j < boards.length && winner === undefined; j++) {
            boards[j] = boards[j].replace(new RegExp(`(\\b)(${nb})(\\b)`), (match, p1, p2, p3) => `${p1}X${p3}`)
            if(isWinningBoard(boards[j])) {
                log(boards[j])
                log(boards[j].match(/\d+/g).map(Number).reduce((acc, d) => acc + d) * nb)

                winner = j
            }
        }    
    }
})