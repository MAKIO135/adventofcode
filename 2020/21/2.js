const fs = require('fs')
const { clear, log } = require('console')
clear()
log('/'.repeat(100))

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let recipes = input.split('\n').map(d => {
        let [ingredients, allergens] = d.split(' (contains').map(s => s.match(/\b\w+\b/g))
        return { ingredients, allergens }
    })
    
    const allergens = {}
    recipes.flatMap(r => r.allergens).forEach(allergen => allergens[allergen] = 1)
    Object.keys(allergens).forEach(allergen => {
        const re = recipes.filter(r => r.allergens.includes(allergen)).map(r => r.ingredients)
        const ingredients = re.flat()
        allergens[allergen] = [...new Set(ingredients)].filter(ingr => ingredients.filter(ing => ing === ingr).length === re.length)
    })
    log({allergens})

    const fixed = {}
    while(Object.keys(allergens).length) {
        for(const [allergen, ingredients] of Object.entries(allergens)) {
            if(ingredients.length === 1) {
                fixed[allergen] = ingredients[0]
                delete allergens[allergen]
            }

            for(const [all, ing] of Object.entries(fixed)) {
                if(ingredients.includes(ing)) ingredients.splice(ingredients.indexOf(ing), 1)
            }
        }
    }
    log(Object.entries(fixed).sort((a, b) => a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0).map(d => d[1]).join(','))
})