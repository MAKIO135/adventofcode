const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const array = n => new Array(n).fill(0).map((d, i) => i)
Array.prototype.count = function(a) {
    return this.filter(d => d === a).length
}

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const lineLineDiff = (a, b) => (parseInt(a, 2) ^ parseInt(b, 2)).toString(2).split('').count('1')

    const findReflection = map => {
        let reflection = 0
        for(let i = 0; reflection === 0 && i < map.length-1; i ++) {
            let smudge = 0
            if(lineLineDiff(map[i], map[i + 1]) === 1) smudge = 1 // smudge on reflection line

            if(map[i] === map[i + 1] || smudge) {
                let n = Math.min(i, map.length - 1 - (i+1))
                let isReflection = true
                for(let j = 1; j <= n && isReflection; j++) {
                    if(map[i-j] !== map[i+1+j]) {
                        if(!smudge && lineLineDiff(map[i - j], map[i + 1 + j]) === 1) smudge = 1
                        else isReflection = false
                    }
                }
                if(isReflection && smudge) reflection = i+1
            }
        }
        return reflection
    }

    input = input.split('\n\n')
        .map(m => {
            m = m.split('\n').map(l => l.replaceAll('.', 0).replaceAll('#', 1))
            // log(m)
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