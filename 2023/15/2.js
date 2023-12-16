const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const array = n => new Array(n).fill(0).map((d, i) => i)

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const steps = input.split(',').reduce((acc, s) => {
        const label = s.match(/\w+/)[0]
        const boxIndex = label.split('').reduce((acc, c, i) => (acc + c.charCodeAt(0)) * 17 % 256, 0)
        const operator = s.match(/[=-]/)[0]
        const step = {
            step: s,
            label,
            boxIndex,
            operator,
        }
        if(operator === '=') step.focal = parseInt(s.match(/\d+/)?.[0])
        acc.push(step)
        return acc
    }, [])

    const boxes = array(256).map(i => ({id: i, lenses: []}))

    steps.forEach(({step, label, boxIndex, operator, focal}) => {
        if(operator === '-') {
            const box = boxes[boxIndex]
            let lensIndex = box.lenses.findIndex(l => l.label === label)
            if(lensIndex >= 0) box.lenses.splice(lensIndex, 1)
        }
        else if(operator === '=') {
            const box = boxes[boxIndex]
            const lensIndex = box.lenses.findIndex(l => l.label === label)
            if(lensIndex >= 0) box.lenses.splice(lensIndex, 1, {focal, label})
            else box.lenses.push({focal, label})
        }
    })

    log(boxes.reduce((acc, b, i) => acc + b.lenses.reduce((acc2, l, j) => acc2 + (1 + i) * (j + 1) * l.focal, 0), 0))
})