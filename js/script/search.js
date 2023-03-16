
function searchRecipes(searchTerm, currentList) {
    let result = []
    for (let i = 0; i < currentList.length; i++) {
        const recipe = currentList[i];
        if (recipe.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
            recipe.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            result.push(currentList[i])

        }
        else {
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j];
                if (ingredient.ingredient.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                    result.push(recipe);
                    break;
                }
            }
        }
    }
    return result
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

