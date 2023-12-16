const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

const array = n => new Array(n).fill(0).map((d,i) => i)

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(l => l.split(''))

    const nx = input[0].length
    const ny = input.length

    let poses = [{ x: 0, y: 0 }]
    let dirs = [{ x: 1, y: 0 }]

    const map = array(ny).map(y => array(nx).fill('.'))

    const memoCache = new Map()
    let isLooping = false
    while(poses.length>0 && !isLooping) {
        for(let i = poses.length - 1; i >= 0; i --) {
            let pos = poses[i]
            let dir = dirs[i]
            const memoKey = `${pos.x},${pos.y}|${dir.x},${dir.y}`
            
            // out of map or duplicate
            if(memoCache.has(memoKey) || pos.x < 0 || pos.x >= nx || pos.y < 0 || pos.y >= ny) {
                poses.splice(i, 1)
                dirs.splice(i, 1)
            }
            else {
                map[pos.y][pos.x] = '#'

                let tile = input[pos.y][pos.x]
                if(tile === '.') {
                    pos.x += dir.x
                    pos.y += dir.y
                }
                else if(tile === '/') {
                    [dir.x, dir.y] = [-dir.y, -dir.x]
                    pos.x += dir.x
                    pos.y += dir.y
                }
                else if(tile === '\\') {
                    [dir.x, dir.y] = [dir.y, dir.x]
                    pos.x += dir.x
                    pos.y += dir.y
                }
                else if(tile === '|') {
                    if(dir.x === 0) {
                        pos.x += dir.x
                        pos.y += dir.y
                    }
                    else {
                        dirs.push({x:0, y:1})
                        poses.push({x:pos.x, y:pos.y+1})
    
                        dir.x = 0
                        dir.y = -1
                        pos.x += dir.x
                        pos.y += dir.y
                    }
                }
                else if(tile === '-') {
                    if(dir.y === 0) {
                        pos.x += dir.x
                        pos.y += dir.y
                    }
                    else {
                        dirs.push({x:1, y:0})
                        poses.push({x:pos.x+1, y:pos.y})
    
                        dir.x = -1
                        dir.y = 0
                        pos.x += dir.x
                        pos.y += dir.y
                    }
                }
            }
            memoCache.set(memoKey, 1)
        }
    }
    
    log(map.flat().filter(d => d === '#').length)
})