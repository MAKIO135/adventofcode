const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const instructions = input.split('\n').map(d => {
        let [cmd, value] = d.split(' ')
        value = parseInt(value)
        return { cmd, value }
    })

    let acc = 0
    const visited = new Set()

    const goto = i => {
        if(visited.has(i)) return;
        visited.add(i)
        
        const {cmd, value} = instructions[i]
        if(cmd === 'acc') acc += value
        goto(cmd === 'jmp' ? i + value : i + 1)
    }
    goto(0)
    
    console.log({ acc })
})