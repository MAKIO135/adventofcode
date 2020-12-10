const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    const data = input.split('\n')
        .map(d => parseInt(d))
        .sort((a, b) => a < b ? -1 : 1)
        .reduce((acc, curr, i, arr) => {
            const diff = i === 0 ? curr : curr-arr[i - 1]
            acc[`diff${diff}`]++
            return acc
        }, {
            diff1: 0,
            diff3: 0
        })
    
    data.diff3++
    console.log(data)

    console.log(data.diff1 * data.diff3)
})