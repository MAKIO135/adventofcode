const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)
    const values = input.split('\n').map(d => {
        let [min, max, char, password] = d.split(/[\s,\-\:]+/)
        min = parseInt(min)
        max = parseInt(max)
        return {
            min,
            max,
            char,
            password
        }
    })
    // console.log(values)s

    const valids = values.filter(d => {
        const chars = d.password.split('')
        const a = chars[d.min - 1] === d.char
        const b = chars[d.max - 1] === d.char
        return ( a || b ) && !( a && b )
    })

    console.log(valids.length)
})