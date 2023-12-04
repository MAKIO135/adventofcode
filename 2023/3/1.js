const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const s = input.split('\n')
    const lineLength = s[0].length + 1
    // log(lineLength)

    const numbers = [...input.matchAll(/\d+/g)].map(d => {
        const index = d.index
        const x = index % lineLength
        const y = index / lineLength | 0
        const len = d[0].length
        const n = parseInt(d[0])
        
        let valid = false
        if(x>0 && input[index - 1] != '.') return n
        if(x+len<lineLength-2 && input[index + len] != '.') return n

        const xx = Math.max(0, x-1)
        const re = /[^.\d]/
        if(y>0 && re.test(s[y-1].substring(xx, xx + len+2))) return n
        if(y<s.length-1 && re.test(s[y+1].substring(xx, xx + len+2))) return n

        return 0

        return {
            n, 
            len, 
            // index, 
            x, 
            y,
            valid,
            // above,
            // under,
        }
    }).reduce((acc,d) => acc + d)

    log(numbers)
})