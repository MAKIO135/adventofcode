const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const [cardPublicKey, doorPublicKey] = input.split('\n').map(d => d = parseInt(d))

    const transform = (v, sn) => {
        v *= sn
        v %= 20201227
        return v
    }

    const searchLoopSize = (subjectNumber, key) => {
        let size = 0
        let value = 1
        while(value !== key) {
            value = transform(value, subjectNumber)
            size ++
            // log({size, value})
        }
        return size
    }

    const loop = (subjectNumber, loopSize) => {
        let value = 1
        for(let i = 0; i < loopSize; i++) value = transform(value, subjectNumber)
        return value
    }
    
    const subjectNumber = 7
    const cardLoopSize = searchLoopSize(subjectNumber, cardPublicKey)
    const doorLoopSize = searchLoopSize(subjectNumber, doorPublicKey)
    const encryption = loop(cardPublicKey, doorLoopSize)
    const encryption2 = loop(doorPublicKey, cardLoopSize)
    log({ cardLoopSize, doorLoopSize, encryption, encryption2 })
})