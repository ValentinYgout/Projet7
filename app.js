let api = new RecipeApi('data/recipes.json').getRecipes()
let noResultMessage = document.querySelector('.no-result-message')

class App {
    recipesData;
    recipesWrapper;
    filtersWrapper;
    resultFromTags
    currentRecipeList;
    fetchedList;
    activeTags;


    constructor(DataFromApi) {

        this.recipesWrapper = document.querySelector('#recipes__cards')
        this.recipesData = DataFromApi
        this.filtersWrapper = document.querySelector(`#filters`)
        this.resultFromTags = []
        this.currentRecipeList = []
        this.fetchedList = []
        this.activeTags = []
    }



    async init() {

        this.fetchedList = await this.recipesData
        this.currentRecipeList = this.fetchedList
        app.display()
        app.SearchAndUpdate()
    }



    async display() {


        let RecipeList = this.currentRecipeList

        this.currentRecipeList.forEach(recipe => {
            const recipeTemplate = new RecipeCard(recipe)
            this.recipesWrapper.appendChild(recipeTemplate.createRecipeCard())

        })
        const FilterList = ['ingredients', 'appliances', 'ustensils']
        this.filtersWrapper.innerHTML = ""
        FilterList.forEach(filter => {
            const filterTemplate = new Filter(filter, RecipeList)
            this.filtersWrapper.appendChild(filterTemplate.createFilter())
            filterTemplate.createToggleArrows()
            filterTemplate.fillList()
            filterTemplate.filterKeyInput()
            filterTemplate.createFilterTags(filter)
        })
   
    }


    async SearchAndUpdate() {
        let RecipeList = this.fetchedList


        let searchInput = document.querySelector('.search__input')
        searchInput.addEventListener("input", (e) => {
            RecipeList = this.fetchedList

            if (this.activeTags.length > 0) {
                RecipeList=  filterAfterDeletingTag(this.activeTags,this.fetchedList)

            }

            let value = e.target.value
            this.recipesWrapper.innerHTML = ""

                // If  input is longer than 2 characters
            if (value && value.length > 2) {
                value = value.toLowerCase()
                let results = searchRecipes(value, RecipeList)
                // if any recipe matches the search value, update list
                if (results.length > 0) {
                    this.recipesWrapper.innerHTML = ""
                    this.currentRecipeList = results
                } else {
                      // otherwise display error message and update list
                    this.recipesWrapper.innerHTML = ""
                    this.currentRecipeList = this.results
                    noResultMessage.innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez
                    chercher « tarte aux pommes », « poisson » etc...`
                }

            } else {
                //if the search value is under 3 characters, after deleting a character for example, we check if there are any tags present, and update the display accordingly in this case, otherwise we reset the display with all  50 recipes from database

                noResultMessage.innerHTML = ""
                if (this.activeTags.length > 0) {
                    let result = filterAfterDeletingTag(this.activeTags,this.fetchedList)
                    this.currentRecipeList = result
                }
                else {
                    if (this.currentRecipeList !== this.fetchedList) {
                        this.currentRecipeList = this.fetchedList
                    }

                }
            }
            this.display()
        })


    }

}




const app = new App(api);

app.init()
