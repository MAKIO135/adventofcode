const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)

    const initInstructions = () => input.split('\n').map((d, i) => {
        let [cmd, value] = d.split(' ')
        value = parseInt(value)

        return {
            cmd,
            value
        }
    })

    const startProgram = (change = {}) => {
        const instructions = initInstructions()
        const visited = new Set()
        
        let index = change.index || 0
        let acc = change.acc || 0
        change = undefined

        const goto = i => {
            if(visited.has(i) || i < 0 || i >= instructions.length) return i
            visited.add(i)
            
            const inst = instructions[i]
            
            // have we set a change already
            if(i !== index && !change && inst.cmd !== 'acc') {
                // store state change
                change = {
                    index: i,
                    acc
                }

                // change current command
                inst.cmd = (inst.cmd === 'jmp') ? 'nop' : 'jmp'
            }

            if(inst.cmd === 'acc') acc += inst.value
            
            // goto next instruction
            i += inst.cmd === 'jmp' ? inst.value : 1

            return goto(i)
        }
        
        index = goto(index)

        if(index !== instructions.length) return startProgram(change)
        else return acc
    }

    const acc = startProgram()
    console.log({ acc })
})