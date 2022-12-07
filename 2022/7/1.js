const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const tree = {
        path: '/',
        size: 0
    }
    let currentDir = tree
    let currentPath = []

    const cd = dir => {
        if(dir === '..') {
            let size = currentDir.size
            currentPath.pop()
            currentDir = currentPath.length === 0 ? tree : currentPath.reduce((acc, d, i) => acc[d], tree)
            currentDir.size += size
        }
        else {
            currentDir = currentDir[dir]
            currentPath.push(dir)
        }
        // log(currentPath.join('/'))
    }

    const ls = list => {
        list.map(l => l.split(' ')).forEach(l => {
            if(l[0] === 'dir') {
                if(!currentDir[l[1]]) currentDir[l[1]] = {
                    path: [...currentPath, l[1]].join('/'),
                    size: 0,
                }
            }
            else {
                currentDir.size += parseInt(l[0])
            }
        })
    }

    input = input.split('\n').filter((d, i)=> i !== 0).join(('\n'))
        .split('$ ')
        .filter(d => d)
        .map(l => l.split('\n').filter(d => d !== 'ls' && d))
        .map(d => d[0].startsWith('cd ') ? d[0] : d)
    //log(input)

    input.forEach(l => {
        if(typeof l === 'string') {
            cd(l.split('cd ')[1])
        }
        else {
            ls(l)
        }
    })
    currentPath.forEach(d => cd('..'))

    //log(JSON.stringify(tree, undefined, 4))

    console.log(JSON.stringify(tree, undefined, 0).match(/\b\d{1,6}\b/g).map(d => parseInt(d)).filter(d => d <= 100000).reduce((acc, d) => acc + d))
})