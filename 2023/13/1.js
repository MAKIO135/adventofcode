const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const array = n => new Array(n).fill(0).map((d, i) => i)

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const findReflection = map => {
        let reflection = 0
        for(let i = 0; reflection === 0 && i < map.length-1; i ++) {
            if(map[i] === map[i + 1]) {
                let n = Math.min(i, map.length - 1 - (i+1))
                let isReflection = true
                for(let j = 1; j <= n && isReflection; j++) {
                    if(map[i-j] !== map[i+1+j]) isReflection = false
                }
                if(isReflection) reflection = i+1
            }
        }
        return reflection
    }

    input = input.split('\n\n')
        .map(m => {
            m = m.split('\n')
            let ref = findReflection(m) * 100
            if(!ref){
            const rot = array(m[0].length)
                .map(y => array(m.length).map(x => m[x][y]).join(''))
                ref = findReflection(rot)
            }
            return ref
        })
    
    log(input.reduce((acc, d) => acc + d))
})