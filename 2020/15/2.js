const { clear, log } = require('console')
clear()

const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const numbers = input.split(',').reduce((acc, d, i) => ({
        ...acc,
        [parseInt(d)]: i
    }), {})

    let index = input.split(',').length - 1
    let last = parseInt(input.split(',').pop())

    log({ numbers, last, index })

    const findLast = n => {
        last = (index - numbers[n]) || 0
        numbers[n] = index
        // log({n, key: numbers[n], last})
    }

    const N = 30000000
    for(; index < N; index ++) {
        findLast(last)
        if(index % 200000 === 0) console.log(index)
    }
    
    
    log(Object.entries(numbers).find(([key, value]) => value === N-1))
})