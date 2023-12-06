const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let [time, recordDist] = input.split('\n').map(l => parseInt([...l.matchAll(/\d+/g)].map(d => d[0]).join('')))

    // const getNumberOfWaysToBeatTheRecord = () => {
    //     let waysToBeatTheRecord = []
    //     for(let t = 0; t <= time; t++) {
    //         let speed = t
    //         let timeRemaining = time - t
    //         let dist = speed * timeRemaining
    //         if(dist > recordDist) waysToBeatTheRecord.push({t, dist})
    //     }

    //     return waysToBeatTheRecord
    // }
    
    // log(getNumberOfWaysToBeatTheRecord().length)

    // Solution using quadratic equation:
    /*
    In this problem, the distance can be computed like this 
    d = t * (T - t)
    
    To isolate t in the formula,  you can follow these steps:
    Expand the expression on the right side of the equation:
    d = t*T − t**2
    
    Rearrange the equation to make it a quadratic equation:
    Quadratic Equation in Standard Form: ax 2 + bx + c = 0
    t**2 - t*T + d = 0

    Use the quadratic formula to solve for 
    The quadratic formula is given by:
    t = (−b ± Math.sqrt(b**2 − 4 * a * c))/ 2a​
    
    In the equation t**2 - t*T + d = 0
    the coefficients are:
    a = 1
    b = −T
    c = d (=distance)

    Plug these values into the quadratic formula:
    t = (-(-T) ± Math.sqrt((-T)**2 − 4 * 1 * d))/ (2 * 1)
    So, the solution for 
    �
    t is given by:
    t = (T ± Math.sqrt(T**2 − 4 * d))/ 2
    */

    const timesForRecord = [
        (time - Math.sqrt(time**2 - 4 * recordDist))/2 | 0,
        (time + Math.sqrt(time**2 - 4 * recordDist))/2 | 0
    ]
    log(timesForRecord[1] - timesForRecord[0])
})