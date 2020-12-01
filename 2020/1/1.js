const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)
    const values = input.split('\n').map(d => parseInt(d))    

    let a, b
    for (let i = 0; i < values.length - 1; i++) {
        for (let j = i + 1; j < values.length; j ++) {
            if (values[i] + values[j] === 2020) {
                a = values[i]
                b = values[j]
                break
            }
        }
        if (a + b === 2020) break
    }

    console.log({ a, b })
    console.log(`a + b = ${a + b}`)
    console.log(`a * b = ${a * b}`)
});