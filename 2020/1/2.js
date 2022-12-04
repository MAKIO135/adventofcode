const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)
    const values = input.split('\n').map(d => parseInt(d))    

    let a, b, c
    for (let i = 0; i < values.length - 2; i++) {
        for (let j = i + 1; j < values.length - 1; j ++) {
            for (let k = j + 1; k < values.length; k ++) {
                if (values[i] + values[j] + values[k] === 2020) {
                    a = values[i]
                    b = values[j]
                    c = values[k]
                    break
                }
                if (a + b + c === 2020) break
            }
            if (a + b + c === 2020) break
        }
    }

    console.log({ a, b, c })
    console.log(`a + b + c = ${a + b + c}`)
    console.log(`a * b * c = ${a * b * c}`)
});