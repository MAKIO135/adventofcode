const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    const compare = (left, right, n) => {
        // If both values are integers
        if(Number.isInteger(left) && Number.isInteger(right)) {
            return left === right ? 'next' : left < right ? true : false
        }

        // If a list runs out of items
        if(left === undefined || right === undefined) {
            return left === undefined && right === undefined ? 'next' :
                left === undefined ? true :
                false
        }
        
        // If exactly one value is an integer
        if(Number.isInteger(left) ^ Number.isInteger(right)) {
            if(Number.isInteger(left)) left = [left]
            else right = [right]
        }

        // If both values are lists
        let result = 'next'
        for(let i = 0; i < Math.max(left.length, right.length) && result === 'next'; i ++) {
            result = compare(left[i], right[i], n+1)
        }
        return result
    }

    input = input.split('\n\n')
        .map(d => d.split('\n').map(l => JSON.parse(l)))
        .map(([left, right], i) => {
            const result = compare(left, right, 0)
            return result
        })
    
    log(input.reduce((acc, d, i) => acc += d === true ? (i + 1) : 0, 0))
})