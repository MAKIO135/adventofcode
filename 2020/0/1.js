const fs = require('fs')

fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err
    console.log(input)

    

    console.log()
})