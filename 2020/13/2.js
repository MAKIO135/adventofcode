// Based on https://www.ashkelly.co.uk/blog/aoc20d13/

const fs = require('fs')

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    let buses = input.split('\n')[1]
    .split(',')
    .map((b, i) => ({
        id: parseInt(b) || 0,
        offset: i
    }))
    .filter(b => b.id !== 0)
    .sort((a, b) => b.id - a.id)
    
    console.clear()
    console.log(buses)

    // buses.every((busID, i) => (t + i) % busID == 0)
    // t%id0 == 0 && (t+1)%id1 == 0 && … && (t+n)%idn == 0
    // (t + buses[0].offset) % buses[0].id
    let t = buses[0].id - buses[0].offset
    let step = buses[0].id

    console.log({ t, step })

    // https://learnersbucket.com/examples/algorithms/program-to-find-the-gcd-of-two-numbers-in-javascript/
    let gcd = (a, b) => b === 0 ? a : gcd(b, a % b)

    // https://learnersbucket.com/examples/algorithms/find-the-lcm-of-two-numbers-in-javascript/
    let lcm = (a, b) => (a * b) / gcd(a, b)

    for(const bus of buses) {
        while ((t + bus.offset) % bus.id !== 0) t += step
        step = lcm(step, bus.id)
    }
    
    console.log(t)
})