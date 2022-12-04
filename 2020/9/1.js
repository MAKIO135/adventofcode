const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    const data = input.split('\n').map(d => parseInt(d))

    const N = 25
    const preamble = data.filter((d, i) => i < N)

    const isInPreamble = n => {
        for(let i = 0; i < N - 1; i ++) {
            for(let j = i + 1; j < N; j ++) {
                if(preamble[i] + preamble[j] === n) return true
            }
        }
        return false
    }
    
    let i
    for(i = N; i < data.length; i++) {
        if(!isInPreamble(data[i])) break;
        preamble.shift()
        preamble.push(data[i])
    }

    console.log(data[i])
})