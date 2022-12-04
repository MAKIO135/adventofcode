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
    
    let res
    for(let i = N; i < data.length && !res; i++) {
        if(!isInPreamble(data[i])) res = data[i];
        preamble.shift()
        preamble.push(data[i])
    }
    // console.log({ res })

    const findList = (start = 0) => {
        const list = []
        let sum = 0
        for(let i = start; i < data.length; i ++){
            sum += data[i]
            list.push(data[i])
            if(sum >= res) break;
        }
        if(sum === res) return list
        else return findList(start + 1)
    }
    const list = findList()
    // console.log({list})
    // console.log({sum: list.reduce((acc, d) => acc + d)})

    let min = Math.min(...list)
    let max = Math.max(...list)
    // console.log({ min, max })
    console.log({ result: min + max })
})