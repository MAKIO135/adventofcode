const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const extractNumbers = s => [...s.matchAll(/\d+/g)].map(d => parseInt(d[0]))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let [times, distances] = input.split('\n').map(extractNumbers)

    const getNumberOfWaysToBeatTheRecord = raceIndex => {
        let time = times[raceIndex]
        let recordDist = distances[raceIndex]

        let waysToBeatTheRecord = []
        for(let t = 0; t <= time; t++) {
            let speed = t
            let timeRemaining = time - t
            let dist = speed * timeRemaining
            if(dist > recordDist) waysToBeatTheRecord.push({t, dist})
        }

        return waysToBeatTheRecord
    }
    
    log(times.map((d,i) => getNumberOfWaysToBeatTheRecord(i)).reduce((acc, d) => acc * d.length, 1))
})