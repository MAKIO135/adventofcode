const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    // console.log(input)

    const rules = input.split('\n').map(rule => {
        let [container, contained] = rule.split(' bags contain ')
        // contained = contained.split(/\sbags?[\,\.]/g).filter(d => d)

        return {
            container,
            contained
        }
    })
    // console.log(rules)
    
    const options = new Set()
    const findContainers = color => {
        rules.filter(r => r.contained.includes(color)).forEach(({ container }) => {
            options.add(container)
            findContainers(container)
        })
    }
    findContainers('shiny gold')

    console.log(options.size)
})