const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)

    const initInstructions = () => input.split('\n').map((d, i) => {
        let [cmd, value] = d.split(' ')
        value = parseInt(value)
        return { cmd, value }
    })

    const startProgram = (change = {}) => {
        const instructions = initInstructions()
        const visited = new Set()
        
        let {i: index = 0, acc = 0} = change
        change = undefined

        const goto = i => {
            if(visited.has(i) || i < 0 || i >= instructions.length) return i
            visited.add(i)
            
            let {cmd, value} = instructions[i]
            
            // have we set a change already
            if(i !== index && !change && cmd !== 'acc') {
                // store state change
                change = { i, acc };

                // change current command
                cmd = cmd === 'jmp' ? 'nop' : 'jmp'
            }

            if(cmd === 'acc') acc += value
            
            // goto next instruction
            return goto(cmd === 'jmp' ? i + value : i + 1)
        }
        index = goto(index)

        if(index !== instructions.length) return startProgram(change)
        else return acc
    }

    const acc = startProgram()
    console.log({ acc })
})