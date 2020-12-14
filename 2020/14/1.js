const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const cmds = input.split('\n').map(d => {
        let [cmd, value] = d.split(' = ')
        return {
            cmd,
            value: cmd === 'mask' ? value : parseInt(value).toString(2).padStart(36, '0'),
            ...(cmd !== 'mask' && { addr: parseInt(/(\d+)/g.exec(cmd)[0]) })
        }
    })
    console.clear()
    console.log({ cmds })

    let mask
    const parseMask = mask => mask.split('')
    
    const mems = {}
    const writeValue = ({ addr, value, mask }) => mems[addr] = value.split('').map((d, i) => mask[i] === 'X' ? d : mask[i]).join('')

    cmds.forEach(d => {
        if(d.cmd === 'mask') mask = parseMask(d.value)
        else writeValue({ ...d, mask })
    })
    // console.log({ mems })

    const result = Object.values(mems).reduce((acc, curr) => acc + parseInt(curr, 2), 0)
    console.log({ result })
})