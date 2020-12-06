const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)

    const groups = input.split('\n\n').map(g => g.split('\n').join(''))

    const uniquesPerGroup = groups.map(g => [...new Set(g)].length)

    const sum = uniquesPerGroup.reduce((acc, curr) => acc + curr)

    console.log(sum)
})