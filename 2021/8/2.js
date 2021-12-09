const fs = require('fs')
const { clear, log } = require('console')
const { ENGINE_METHOD_PKEY_METHS } = require('constants')
clear()
log('/'.repeat(100))

Array.prototype.count = function(a) { 
    return this.filter(d => d === a).length
}

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    const segsByNb = [
        [0, 1, 2,    4, 5, 6],
        [2,             5   ],
        [0,    2, 3, 4,    6],
        [0,    2, 3,    5, 6],
        [   1, 2, 3,    5   ],
        [0, 1,    3,    5, 6],
        [0, 1,    3, 4, 5, 6],
        [0,    2,       5   ],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3,    5, 6]
    ]

    // number of segments in numbers 0 -> 9
    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    // [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]
    const nSegByNb = segsByNb.map(d => d.length)
    //log(nSegByNb)
    
    input = input.split('\r\n').map(l => l.split(' | ').map(d => d.split(' ')))
    
    const sum = input.reduce((acc, line) => {
        let [numbers, output] = line
        //log({numbers, output})
    
        const one = numbers.filter(d => d.length === nSegByNb[1])[0]
        const four = numbers.filter(d => d.length === nSegByNb[4])[0]
        const seven = numbers.filter(d => d.length === nSegByNb[7])[0]
        const eight = numbers.filter(d => d.length === nSegByNb[8])[0]
    
        const nine = numbers.filter(d => d.length === nSegByNb[9]).filter(d => four.split('').every(c => d.includes(c)))[0]
        const zero = numbers.filter(d => d.length === nSegByNb[0] && d !== nine).filter(d => one.split('').every(c => d.includes(c)))[0]
        const six = numbers.filter(d => d.length === nSegByNb[0] && d !== nine && d !== zero)[0]
        
        const three = numbers.filter(d => d.length === nSegByNb[3]).filter(d => one.split('').every(c => d.includes(c)))[0]
        const five = numbers.filter(d => d.length === nSegByNb[5]).filter(d => d.split('').every(c => six.includes(c)))[0]
        const two = numbers.filter(d => d.length === nSegByNb[2] && d !== three && d !== five)[0]
        
        numbers = [zero, one, two, three, four, five, six, seven, eight, nine].map(d => d.split('').sort().join(''))
        //log(numbers)
    
        output = parseInt(output.reduce((acc, d) => `${acc}${numbers.indexOf(d.split('').sort().join(''))}`, ''))
        //log(output)

        return acc + output
    }, 0)

    log(sum)
})