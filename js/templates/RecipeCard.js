class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe
    }








    createRecipeCard() {
        let ingredients = this._recipe.ingredients
        // console.log(ingredients)

        const column = document.createElement('div');
        column.classList.add('ingredients__detailled--block');
        let ingredientData;


        for (const ingredient of ingredients) {
            ingredientData = document.createElement('p');
            ingredientData.setAttribute('data-ingredient', ingredient.ingredient);
            if (ingredient.unit === '' || ingredient.unit == null) {
                if (ingredient.quantity) {
                    ingredientData.innerHTML = `<strong>${ingredient.ingredient} :</strong> ${ingredient.quantity}`;
                } else {
                    ingredientData.innerHTML = `<strong>${ingredient.ingredient}`;
                }
            } else {
                ingredientData.innerHTML = `<strong>${ingredient.ingredient} : </strong> ${ingredient.quantity} ${ingredient.unit}`;
            }

            column.appendChild(ingredientData);

        }



        const $wrapper = document.createElement('div')
        $wrapper.classList.add('recipe-card-wrapper')

        const recipeCard = 
        `<article id="${this._recipe.id}" servings="${this._recipe.servings}">
             <div class="blank-space"></div>
            <header>
                <h2 class="nom">${this._recipe.name}</h2>
                <span class="duration-icon">
                    <i class="far fa-clock fa-lg"></i>
                </span>
                    <h3>${this._recipe.time}</h3>
            </header>
            <div class="informations">
                
                    ${column.outerHTML}
                        
                   
               
                        <p class="description"> ${this._recipe.description}</p>
    
        </article>`

        $wrapper.innerHTML = recipeCard
        return $wrapper
    }
}