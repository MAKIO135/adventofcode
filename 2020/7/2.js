const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)

    const rules = input.split('\n').reduce((acc, rule) => {
        let [container, contained] = rule.split(' bags contain ')
        contained = contained.split(/\sbags?[\,\.]\s?/g)
            .filter(d => d) // remove empty
            .map(d => {
                if (d === 'no other') return [d, 0]

                const [n, ...color] = d.split(' ')
                return [color.join(' '), parseInt(n)]
            })
            .reduce((acc2, curr) => {
                acc2[curr[0]] = curr[1]
                return acc2
            }, {})

        acc[container] = contained
        return acc
    }, {})
    console.log(rules)

    let sum = 0
    const findContained = (color, nb) => {
        Object.entries(rules[color]).forEach(([c, n]) => {
            sum += n
            if(rules[c]) for(let i = 0; i < n; i ++) findContained(c)
        })
    }
    findContained('shiny gold', 1)

    console.log(sum)
})