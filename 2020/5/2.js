const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)

    const seats = input.split('\n').map(d => {
        let [, row, column] = /([FB]{7})([RL]{3})/.exec(d)
        row = parseInt(row.replace(/F/g, '0').replace(/B/g, '1'), 2)
        column = parseInt(column.replace(/L/g, '0').replace(/R/g, '1'), 2)

        const id = row * 8 + column

        return {
            row,
            column,
            id
        }
    }).sort((a, b) => {
        return a.id > b.id ? -1 :
        a.id < b.id ? 1 :
        0
    })

    const ids = seats.map(d => d.id)
    const id = ids.find(d => !ids.includes(d - 1)) - 1

    console.log(id)
})