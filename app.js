class App {
    constructor() {

        this.$recipesWrapper = document.querySelector('#recipes__cards')
        this.recipesApi = new RecipeApi('data/recipes.json')
        this.$filtersWrapper = document.querySelector(`#filters`)
    }

    
    set recipesData(data){

        this._recipeData=data

    }
    async main() {
        

        const recipesData = await this.recipesApi.getRecipes()
        recipesData.map(recipe => new Recipe(recipe))
        recipesData.forEach(recipe => {
            const recipeTemplate = new RecipeCard(recipe)

            this.$recipesWrapper.appendChild(recipeTemplate.createRecipeCard())

        })
        const FilterList = ['ingredients', 'appliances', 'ustensils']

        FilterList.forEach(filter => {
            const filterTemplate = new Filter(filter,recipesData )
            this.$filtersWrapper.appendChild(filterTemplate.createFilter())

            filterTemplate.createToggleArrows()

            filterTemplate.fillList()
            
            filterTemplate.createFilterTags()
        })



    }

}


const app = new App();
app.main()