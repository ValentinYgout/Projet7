function searchRecipes(searchTerm, currentList) {


    return currentList.filter(recipe => {
        // console.log(recipe.ingredients, recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm)), searchTerm)
        return recipe.name.toLowerCase().includes(searchTerm)
            || recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm))
            || recipe.description.toLowerCase().includes(searchTerm)
    })

}
function searchWithFilters(searchTerm, currentList) {

    return currentList.filter(recipe => {
      
        return recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm))
            || recipe.ustensils.map(ustensils => ustensils.toLowerCase()).includes(searchTerm)
            || recipe.appliance.toLowerCase().includes(searchTerm)
    })

}


function filterAfterDeletingTag(searchTerms, allRecipes) {
    let currentList = allRecipes
    // console.log(searchTerms,currentList)
    for (let i = 0; i < searchTerms.length; i++) {
        const searchTerm = searchTerms[i];
        currentList = searchWithFilters(searchTerm, currentList)
        // console.log(currentList)
    }
    return currentList
}

