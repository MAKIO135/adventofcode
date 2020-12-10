const fs = require('fs')

fs.readFile('./test2', 'utf8', (err, input) => {
    if (err) throw err
    
    input = input.split('\n').map(d => parseInt(d)).sort((a, b) => a < b ? -1 : 1)
    input.unshift(0)
    // console.log(input.map(d => `${d}`.padStart(6, ' ')).join(''))
    
    // const switches = input.map((d, i) => {
    //     let n = 0 
    //     if(input.includes(d + 1)) n++
    //     if(input.includes(d + 2)) n++
    //     if(input.includes(d + 3)) n++
    //     return n
    // })
    const switches = input.map(d => [d + 1, d + 2, d + 3].filter(v => input.includes(v)).length)
    // console.log(switches.map(d => `${d}`.padStart(6, ' ')).join(''))

    const path = new Array(switches.length).fill(1)
    for(let i = switches.length - 2; i >= 0; i --) {
        if(switches[i] === 1) path[i] = path[i + 1]
        if(switches[i] === 2) path[i] = path[i + 1] + path[i + 2]
        if(switches[i] === 3) path[i] = path[i + 1] + path[i + 2] + path[i + 3]
    }
    // console.log(path.map(d => `${d}`.padStart(6, ' ')).join(''))
    console.log(path[0])
})