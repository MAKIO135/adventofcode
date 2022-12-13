const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    const compare = (left, right, n) => {
        // If both values are integers
        if(Number.isInteger(left) && Number.isInteger(right)) {
            return left === right ? 'next' : left < right ? 1 : -1
        }

        // If a list runs out of items
        if(left === undefined || right === undefined) {
            return left === undefined && right === undefined ? 'next' :
                left === undefined ? 1 :
                -1
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

    let decoderKey = 1
    ;[...input.split('\n\n'), '[[2]]\n[[6]]']
        .map(d => d.split('\n').map(l => JSON.parse(l))).flat()
        .sort((left, right) => compare(right, left))
        .map(d => JSON.stringify(d))
        .forEach((d, i) => {
            if(['[[2]]','[[6]]'].includes(d)) {
                decoderKey *= i + 1
            }
        })   

    
    log(decoderKey)
})