const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const extractNumbers = s => [...s.matchAll(/\d+/g)].map(d => parseInt(d[0]))
const array = n => new Array(n).fill(0).map((d, i) => i)

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const data = input.split('\n').map(l => {
        let [pattern, counts] = l.split(' ')
        pattern = array(5).map(i => pattern).join('?')
        counts = extractNumbers(array(5).map(i => counts).join(','))
        return [pattern, counts]
    })

    // Based on https://github.com/zedrdave/advent_of_code/blob/master/2023/12/12.ipynb
    const memoCache = new Map()
    const recurFit = (pattern, counts) => {
        // Generate a unique key for memoization based on the pattern and counts
        const memoKey = pattern + '|' + counts.join(',')
    
        // Check if the result for the current inputs is already memoized
        if (memoCache.has(memoKey)) return memoCache.get(memoKey)
    
        let result
    
        // Base cases
        if (counts.length === 0) {
            // If there are no more counts left, check if '#' is absent in the pattern
            result = !pattern.includes('#')
        } 
        else if (pattern.length === 0) {
            // If the pattern is empty, return 0
            result = 0
        } 
        else if (pattern[0] === '#') {
            // If the first character of the pattern is '#'
            if (pattern.length >= counts[0] && !pattern.slice(0, counts[0]).includes('.')) {
                // Check conditions for '#' and '.' in the pattern
                if (pattern.length === counts[0]) {
                    // If the length matches, check if there are no more counts left
                    result = counts.length === 1
                } 
                else if (pattern[counts[0]] !== '#') {
                    // Recur with the remaining pattern and counts if the next character is not '#'
                    result = recurFit(pattern.slice(counts[0] + 1), counts.slice(1))
                } 
                else {
                    result = 0
                }
            } 
            else {
                result = 0
            }
        } 
        else if (pattern[0] === '.') {
            // If the first character of the pattern is '.', recur with the remaining pattern and counts
            result = recurFit(pattern.slice(1), counts)
        } 
        else if (pattern[0] === '?') {
            // If the first character of the pattern is '?', consider both cases
            result = recurFit(pattern.slice(1), counts) + recurFit('#' + pattern.slice(1), counts)
        }
    
        // Memoize the result for the current inputs
        memoCache.set(memoKey, result)
        return result
    }
    
    log(data.reduce((sum, [pattern, counts], i) => sum + recurFit(pattern, counts), 0))
})