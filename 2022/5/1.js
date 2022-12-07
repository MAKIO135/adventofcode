const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let [crates, cmds] = input.split('\n\n')

    crates = crates.split('\n').reverse()
    
    crates = crates.map(l => l.split('').reduce((acc,d,i) => {
        if(!acc[i / 4 | 0]) acc[i/4|0] = ''
        if(i % 4 === 1) acc[i/4|0] += d
        return acc
    }, [])).reduce((acc, d, i) => {
        if(i === 0) d.forEach((k, j) => acc[j] = [])
        else d.forEach((k, j) => {
            if(k !== ' ') acc[j].push(k)
        })
        return acc
    }, [])
    console.log(crates.map((d, i) => `${i+1}: ${d.join('')}`).join('\n'))

    cmds = cmds.split('\n').map(l => l.split(' ').filter((d, i) => [1, 3, 5].includes(i)).map(d => parseInt(d)))
    // log(cmds)

    cmds.forEach((cmd,j) => {
        for(let i = 0; i < cmd[0]; i++) {
            const crate = crates[cmd[1]-1].pop()
            if(crate) crates[cmd[2]-1].push(crate)
        }
    })
    
    // console.log(crates)

    console.log(crates.map((d, i) => `${i+1}: ${d.join('')}`).join('\n'))
    console.log(crates.map((d, i) => d[d.length-1]).join(''))
})