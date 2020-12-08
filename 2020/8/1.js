const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)

    const instructions = input.split('\n').map(d => {
        let [cmd, value] = d.split(' ')
        value = parseInt(value)

        return {
            cmd,
            value
        }
    })

    let acc = 0
    const visited = new Set()

    const goto = i => {
        if(visited.has(i)) return;
        
        const instruction = instructions[i]
        visited.add(i)

        if(instruction.cmd === 'acc') acc += instruction.value

        i += instruction.cmd === 'jmp' ? instruction.value : 1
        goto(i)
    }

    goto(0)
    
    console.log(acc)
})