const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)

    const groups = input.split('\n\n').map(g => ({
        nbPerson: g.split('\n').length,
        answers: g.split('\n').join('').split('')
    }))
    // console.log(groups)
    
    const uniquesPerGroup = groups.map(g => [...new Set(g.answers)])
    // console.log(uniquesPerGroup)

    const count = (arr, a) => arr.filter(d => d === a).length

    const commonsPerGroup = groups.map((g, i) => uniquesPerGroup[i].filter(u => count(g.answers, u) === g.nbPerson).length)
    // console.log(commonsPerGroup)


    const sum = commonsPerGroup.reduce((acc, curr) => acc + curr, 0)

    console.log(sum)
})