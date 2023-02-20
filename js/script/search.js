function searchRecipes(searchTerm, currentList) {

  
    return currentList.filter(recipe => {
        console.log(recipe.ingredients, recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm)), searchTerm)
        return recipe.name.toLowerCase().includes(searchTerm)
            || recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm))
            || recipe.description.toLowerCase().includes(searchTerm)
    })

}
function searchWithFilters(searchTerm, currentList) {
    return currentList.filter(recipe => {
        console.log(recipe.ingredients, recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm)), searchTerm)

        return recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm))
            || recipe.ustensils.map(ustensils => ustensils.toLowerCase()).includes(searchTerm)
            || recipe.appliance.toLowerCase().includes(searchTerm)
    })

}

function CheckIngredients(searchTerm, currentList) {
    return currentList.filter(recipe => {
        return recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm))
    })
}




function CheckUstensils(searchTerm, currentList) {
    return currentList.filter(recipe => {
        return recipe.ustensils.includes(searchTerm)
    })
}

function CheckAppliance(searchTerm, currentList) {
    return currentList.filter(recipe => {
        return recipe.appliance.toLowerCase().includes(searchTerm)
    })
}

function updateAfterDeletingTag(){
        
}
function filterIngredientList(){
    console.log("test")
}
