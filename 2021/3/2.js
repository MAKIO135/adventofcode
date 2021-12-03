const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split('\r\n')
    //log(input)


    let arr = [...input]
    let pos = 0
    while(arr.length > 1) {
        // search most/least common bit
        let n0 = 0
        let n1 = 0
        arr.forEach(l => {
            if(l[pos] === '0') n0++
            else n1++
        })
        const mostCommon = n0 <= n1 ? '1' : '0'
        arr = arr.filter(d => d[pos] === mostCommon)
        pos++
    }
    const oxygen = parseInt(arr[0], 2)
    log(oxygen)

    arr = [...input]
    pos = 0
    while(arr.length > 1) {
        // search most/least common bit
        let n0 = 0
        let n1 = 0
        arr.forEach(l => {
            if(l[pos] === '0') n0++
            else n1++
        })
        const leastCommon = n0 <= n1 ? '0' : '1'
        arr = arr.filter(d => d[pos] === leastCommon)
        pos++
    }
    const co2 = parseInt(arr[0], 2)
    log(co2)

    const lifeSupport = oxygen * co2
    log(lifeSupport)
})