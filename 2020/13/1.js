const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    let [earliest, buses] = input.split('\n')
    earliest = parseInt(earliest)
    buses = buses.split(',')
        .filter(b => b !== 'x')
        .map(b => parseInt(b))
        .sort((a, b) => a - b)

    const awaitings = buses.map(b => (Math.floor(earliest / b) + 1) * b - earliest)
    console.log({ earliest, buses, awaitings })
    
    const min = Math.min(...awaitings)
    const result = buses[awaitings.indexOf(min)] * min
    console.log({ result })
})