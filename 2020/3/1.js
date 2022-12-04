const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    input = input.split('\n')
    // console.log(input)

    let x = 0
    let trees = 0
    for(let y = 1; y < input.length; y ++) {
        const row = input[y].split('')

        x = (x + 3) % row.length
        
        if (row[x] === '#') {
            row[x] = 'X'
            trees ++
        }
        else row[x] = 'O'

        input[y] = row.join('')
    }

    console.log(trees)
    // console.log(input.join('\n'))
})