const fs = require('fs')

fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
    
    console.log(input)
})