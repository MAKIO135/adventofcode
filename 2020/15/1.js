const { clear, log } = require('console')
clear()

const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const numbers = input.split(',').map(d => parseInt(d))
    const findLast = arr => {
        const copy = [...arr]
        let n = copy.pop()
        return copy.reverse().indexOf(n) + 1
    }
    while(numbers.length < 2020) {
        numbers.push(findLast(numbers))
    }
    console.log(numbers[numbers.length - 1])
})