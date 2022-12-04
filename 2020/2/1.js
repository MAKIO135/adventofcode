const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)
    const values = input.split('\n').map(d => {
        let [min, max, char, password] = d.split(/[\s\-\:]+/)
        min = parseInt(min)
        max = parseInt(max)
        return {
            min,
            max,
            char,
            password
        }
    })
    // console.log(values)

    const valids = values.filter(d => {
        const occurences = d.password.split('').filter(c => c === d.char)
        return occurences.length >= d.min && occurences.length <= d.max
    })

    console.log(valids.length)
})