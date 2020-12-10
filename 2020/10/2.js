const fs = require('fs')

fs.readFile('./test2', 'utf8', (err, input) => {
    if (err) throw err
    
    console.clear()

    console.log('/'.repeat(100))
    
    input = input.split('\n')
        .map(d => parseInt(d))
        .sort((a, b) => a < b ? -1 : 1)

    input.unshift(0)
    console.log(input.map(d => `${d}`.padStart(6, ' ')).join(''))

    const diffs = input.map((d, i) => i === 0 ? d : d - input[i - 1])
    console.log(diffs.map(d => `${d}`.padStart(6, ' ')).join(''))

    const switches = diffs.map((d, i) => {
        let n = 1
        if(diffs[i + 1] === 1 && diffs[i + 2] === 1) n++
        if(diffs[i + 1] === 1 && diffs[i + 2] === 1 && diffs[i + 3] === 1) n++
        return n
    })
    console.log(switches.map(d => `${d}`.padStart(6, ' ')).join(''))

    const path = new Array(switches.length).fill(1)

    for(let i = switches.length - 2; i >= 0; i --) {
        const n = switches[i]
        switch(n) {
            case 1:
                path[i] = path[i + 1]
                break
            case 2:
                path[i] = path[i + 1] + path[i + 2]
                break
            case 3:
                path[i] = path[i + 1] + path[i + 2] + path[i + 3]
                break
        }
    }
    console.log(path.map(d => `${d}`.padStart(6, ' ')).join(''))
    console.log(path[0])
})