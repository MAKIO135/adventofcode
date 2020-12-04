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

    // cid (Country ID) - ignored, missing or not.
    const validKeys = [
        'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', //'cid',
    ]

    const valids = passports.reduce((acc, pass) => {
        // every keys required
        if (validKeys.some(key => pass[key] === undefined)) return acc
        
        // byr (Birth Year) - four digits; at least 1920 and at most 2002
        if (!(parseInt(pass.byr) >= 1920 && parseInt(pass.byr) <= 2002)) return acc
        
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020
        if (!(parseInt(pass.iyr) >= 2010 && parseInt(pass.iyr) <= 2020)) return acc

        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030
        if (!(/\b20[0-9]{2}\b/.test(pass.eyr) && parseInt(pass.eyr) >= 2020 && parseInt(pass.eyr) <= 2030)) return acc

        // hgt (Height) - a number followed by either cm or in:
        // If in, the number must be at least 59 and at most 76.
        // If cm, the number must be at least 150 and at most 193.
        if(!(/\b[0-9]{2,3}(in|cm)\b/.test(pass.hgt) && 
            ((pass.hgt.endsWith('in') && parseInt(pass.hgt) >= 59 && parseInt(pass.hgt) <= 76) ||
            (pass.hgt.endsWith('cm') && parseInt(pass.hgt) >= 150 && parseInt(pass.hgt) <= 193))
        )) return acc
        
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        if(!/\#[0-9a-z]{6}\b/.test(pass.hcl)) return acc
        console.log(pass.hcl)
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        if(!/\b(amb|blu|brn|gry|grn|hzl|oth)\b/.test(pass.ecl)) return acc
        
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        if(!/\b[0-9]{9}\b/.test(pass.pid)) return acc

        return ++acc
    }, 0)

    console.log(valids)
})