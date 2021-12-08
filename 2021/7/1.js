const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err
    input = input.split(',').map(Number)
    log(input)

    function median(values){
        if(values.length ===0) throw new Error("No inputs");
      
        values.sort(function(a,b){
          return a-b;
        });
      
        var half = Math.floor(values.length / 2);
        
        if (values.length % 2) return values[half];
        
        return (values[half - 1] + values[half]) / 2.0;
    }

    const med = median([...input])
    log(input.reduce((sum, d) => sum + Math.abs(d - med), 0))
})