const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)

    const passports = input.split('\n\n').map(d => {
        d = d.split('\n').join(' ')
        return d.split(' ')
            .map(f => f.split(':'))
            .reduce((acc, curr) => {
                acc[curr[0]] = curr[1]
                return acc
            }, {})
    })

    // console.log(passports)

    const validKeys = [ 
        'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', // 'cid',
    ]

    const valids = passports.reduce((acc, pass) => {
        const isUnvalid = validKeys.some(key => pass[key] === undefined)
        return acc + (isUnvalid ? 0 : 1)
    }, 0)

    console.log(valids)
})