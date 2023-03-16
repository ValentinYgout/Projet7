// function searchRecipes(searchTerm, currentList) {


//     return currentList.filter(recipe => {
//         // console.log(recipe.ingredients, recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm)), searchTerm)
//         return recipe.name.toLowerCase().includes(searchTerm)
//             || recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm))
//             || recipe.description.toLowerCase().includes(searchTerm)
//     })

// }
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
    // console.log(searchTerm,currentList,"inside function")

    return currentList.filter(recipe => {
        // console.log(recipe.ingredients, recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm)), searchTerm)
        return recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).some((ingredient) => ingredient.includes(searchTerm))
            || recipe.ustensils.map(ustensils => ustensils.toLowerCase()).includes(searchTerm)
            || recipe.appliance.toLowerCase().includes(searchTerm)
    })

}

// function searchWithFilters(searchTerm, currentList) {
//     let results = [];
//     for (let i = 0; i < currentList.length; i++) {
//         let recipe = currentList[i];
//         let hasIngredient = false;
//         let hasUstensil = false;
//         let hasAppliance = false;

//         for (let j = 0; j < recipe.ingredients.length; j++) {
//             let ingredient = recipe.ingredients[j].ingredient.toLowerCase();
//             if (ingredient.indexOf(searchTerm.toLowerCase()) !== -1) {
//                 hasIngredient = true;
//                 break;
//             }
//         }

//         if (recipe.ustensils) {
//             for (let j = 0; j < recipe.ustensils.length; j++) {
//                 let ustensil = recipe.ustensils[j].toLowerCase();
//                 if (ustensil.indexOf(searchTerm.toLowerCase()) !== -1) {
//                     hasUstensil = true;
//                     break;
//                 }
//             }
//         }

//         if (recipe.appliance) {
//             let appliance = recipe.appliance.toLowerCase();
//             if (appliance.indexOf(searchTerm.toLowerCase()) !== -1) {
//                 hasAppliance = true;
//             }
//         }

//         if (hasIngredient || hasUstensil || hasAppliance) {
//             results.push(recipe);
//         }
//     }
//     return results;

// }

// function filterAfterDeletingTag(searchTerms, allRecipes) {
//     return searchTerms.reduce((currentList, searchTerm) => {
//       return searchWithFilters(searchTerm, currentList);
//     }, allRecipes);
//   }


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

