function searchRecipes(searchTerm, currentList) {
    let ustensilsResult = CheckUstensils(searchTerm, currentList)
    let applianceResult = CheckAppliance(searchTerm, currentList)
    let ingredientsResult = CheckIngredients(searchTerm, currentList)
   console.log("recherche lancée")

    if (applianceResult.length > 0) {
        console.log("found appliance", applianceResult)
        return applianceResult
    }
    if (ustensilsResult.length > 0) {
        console.log("found ustensil", ustensilsResult)
        return ustensilsResult
    } else if (ingredientsResult) {
        console.log("found ingredient", ingredientsResult)
        return ingredientsResult
    }
}

function CheckIngredients(searchTerm, currentList) {

    return currentList.filter(recipe => {
        // console.log( recipe.ingredients,"found",recipe.ingredients.filter(ingredient=>ingredient.ingredient.includes(searchTerm)))
        console.log(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(searchTerm))
        return recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(searchTerm)
    })


}




function CheckUstensils(searchTerm, currentList) {
    return currentList.filter(recipe => {
        //     console.log( "liste:",recipe.ustensils, "et recherche:",searchTerm)
        return recipe.ustensils.includes(searchTerm)
    });

}

function CheckAppliance(searchTerm, currentList) {
    return currentList.filter(recipe => {
        let re = new RegExp(`\\b${searchTerm}\\b`, 'gi');
        // console.log( recipe.appliance)
        return recipe.appliance.match(re)
    });
}