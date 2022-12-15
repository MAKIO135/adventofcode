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
            dist: Math.abs(l[0] - l[2]) + Math.abs(l[1] - l[3])
        }))
    
    const lineY = 2000000
    let line = input.filter(({ sensor, dist }) => Math.abs(sensor.y - lineY) <= dist)
        .map(({ sensor, dist }) => {
            let d = dist - Math.abs(sensor.y - lineY)
            return [sensor.x - d, sensor.x + d]
        })
        .sort((a, b) => a[0] - b[0])
        .reduce((acc, d, i) => {
            if(i === 0) acc.current = d
            else if(d[0] <= acc.current[1] + 1 && d[1] > acc.current[1]) acc.current[1] = d[1]
            else if(d[0] > acc.current[1] + 1) {
                acc.ranges.push([...acc.current])
                acc.current = [...d]
            }
            return acc
        }, { current: undefined, ranges: []})
    line.ranges.push(line.current)

    log(line.ranges.reduce((acc,d) => acc += d[1] - d[0], 0))
})