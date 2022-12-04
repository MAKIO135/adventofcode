const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const cmds = input.split('\n').map(d => {
        let [cmd, value] = d.split(' = ')
        return {
            cmd,
            value: cmd === 'mask' ? value.split('') : parseInt(value),
            ...(cmd !== 'mask' && { addr: parseInt(/(\d+)/g.exec(cmd)[0]).toString(2).padStart(36, '0') })
        }
    })
    // console.log({ cmds })

    let mask

    const mems = {}
    const writeValue = ({ addr, value, mask }) => {
        addr = addr.split('').map((d, i) => mask[i] === '0' ? d : mask[i] === '1' ? '1' : 'X')
        // console.log({ addr: addr.join('') })

        const switches = addr.map((d, i) => ({ val: d, index: i })).filter(d => d.val === 'X')
        const possibilities = 2 ** switches.length
        for(let test = 0; test < possibilities; test++) {
            let _addr = [...addr]

            let bin = test.toString(2).padStart(switches.length, '0').split('')
            // console.log({ bin })
            for(let i = 0; i < bin.length; i ++) {
                _addr[switches[i].index] = bin[i]
            }
            // console.log(_addr.join(''))
            mems[parseInt(_addr.join(''), 2)] = value
        }
    }

    cmds.forEach(d => {
        if(d.cmd === 'mask') mask = d.value
        else writeValue({ ...d, mask })
    })
    // console.log({ mems })

    const result = Object.values(mems).reduce((acc, curr) => acc + curr)
    console.log({ result })
})