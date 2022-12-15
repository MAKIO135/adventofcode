const fs = require('fs')
const { clear, log } = require('console')
const { join } = require('path')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n')
        .map(l => l.match(/-?\d+/g).map(d => parseInt(d)))
        .map(l => ({
            sensor: { x: l[0], y: l[1] },
            beacon: { x: l[2], y: l[3] },
            dist: Math.abs(l[0] - l[2]) + Math.abs(l[1] - l[3])
        }))

    const max = 4000000
    let found = false
    for(let lineY = 0; lineY <= max && !found; lineY ++) {
        if(lineY % 100000 === 0) log(lineY)

        let line = input.filter(({ sensor, dist }) => Math.abs(sensor.y - lineY) <= dist)
            .map(({ sensor, dist }) => {
                let d = dist - Math.abs(sensor.y - lineY)
                return [sensor.x - d, sensor.x + d]
            })
            .sort((a, b) => a[0] - b[0])
            .map(d => {
                d[0] = Math.max(0, d[0])
                d[1] = Math.min(max, d[1])
                return d
            })
            .reduce((acc, d, i) => {
                if(i === 0) acc.current = d
                else if(d[0] <= acc.current[1] + 1 && d[1] > acc.current[1]) acc.current[1] = d[1]
                else if(d[0] > acc.current[1] + 1) {
                    acc.ranges.push([...acc.current])
                    acc.current = [...d]
                }
                return acc
            }, { current: undefined, ranges: []})

        if(line.ranges.length) {
            line.ranges.push(line.current)
            const x = line.ranges[0][1] + 1
            const y = lineY
            log(x, y, x * 4000000 + y)

            found = true
        }
    }
})