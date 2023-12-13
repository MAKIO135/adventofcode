const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const extractNumbers = s => [...s.matchAll(/\d+/g)].map(d => parseInt(d[0]))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(l => {
        let [map, values] = l.split(' ')
        map = map.replaceAll('.', ' ').trim().replaceAll(' ', '.')
        values = extractNumbers(values)

        const groupsMask = parseInt(map.split('').map(i => i !== '.' ? 1 : 0).join(''), 2)
        const fixedMask = parseInt(map.split('').map(i => i === '#' ? 1 : 0).join(''), 2)

        let valids = 0

        let indices = values.map((v, i) => ({
            index: values.filter((vv, ii) => ii < i).reduce((acc, vv, ii) => acc + vv + 1, 0),
            len: v
        }))

        const computeIndicesFrom = n => indices.forEach((d, i) => {
            if(i > n) {
                const prevIndex = indices[i - 1]
                d.index = prevIndex.index + prevIndex.len + 1
            }
        })

        const checkValidity = () => {
            let valuesMask = indices.reduce((acc, {index, len}) => {
                return acc + (parseInt('1'.repeat(len), 2) << (map.length - index - (len)))
            }, 0)
            
            const fixedTest = (valuesMask & fixedMask) === fixedMask
            const groupsTest = (groupsMask & valuesMask) === valuesMask
            if(fixedTest && groupsTest) valids ++
        }

        checkValidity()

        const move = N => {
            if(N < 0) return;

            indices[N].index++
            computeIndicesFrom(N)
            
            const last = indices[indices.length - 1]
            if(last.index + last.len > map.length) move(N-1)
            else {
                checkValidity()
                move(indices.length - 1)
            }
        }
        move(indices.length - 1)

        return valids
    })
    
    log(input.reduce((acc, d) => acc + d))
})