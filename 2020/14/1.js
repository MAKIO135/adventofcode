const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const cmds = input.split('\n').map(d => {
        let [cmd, value] = d.split(' = ')
        let addr
        if(cmd !== 'mask') {
            addr = parseInt(/(\d+)/g.exec(cmd)[0])
            cmd = 'mem',
            value = parseInt(value).toString(2).padStart(36, '0').split('')
        }
        return {
            cmd,
            value,
            ...addr && { addr }
        }
    })
    console.clear()
    // console.log(cmds)

    const parseMask = mask => mask.split('')
    let mask
    const writeValue = ({ addr, value, mask }) => mems[addr] = value.map((d, i) => mask[i] === 'X' ? d : mask[i]).join('')
    const mems = {}

    cmds.forEach(d => {
        if(d.cmd === 'mask') mask = parseMask(d.value)
        else writeValue({ ...d, mask })
    })
    // console.log({ mems })

    const result = Object.values(mems).reduce((acc, curr) => acc + parseInt(curr, 2), 0)
    console.log({ result })
})