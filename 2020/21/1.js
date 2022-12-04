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
    // log(recipes)
    
    const allergens = {}
    recipes.flatMap(r => r.allergens).forEach(allergen => allergens[allergen] = 1)
    log(allergens)
    Object.keys(allergens).forEach(allergen => {
        log(allergen)
        const re = recipes.filter(r => r.allergens.includes(allergen)).map(r => r.ingredients)
        const ingredients = re.flat()
        allergens[allergen] = [...new Set(ingredients)].filter(ingr => ingredients.filter(ing => ing === ingr).length === re.length)
        log({[allergen]: allergens[allergen]})
    })
    const ingredientsWithPossibleAllergen = [...new Set(Object.values(allergens).flatMap(v => v))]
    // log(ingredientsWithPossibleAllergen)
    const ingredientsWithoutPossibleAllergen = recipes.flatMap(r => r.ingredients).filter(d => !ingredientsWithPossibleAllergen.includes(d))
    log(ingredientsWithoutPossibleAllergen.length)

})