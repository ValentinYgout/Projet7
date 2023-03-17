

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
        if (RecipeList && RecipeList.length > 0) {

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

    }


    async SearchAndUpdate() {

        let RecipeList = this.fetchedList
        let searchInput = document.querySelector('.search__input')

        searchInput.addEventListener("input", (e) => {
            let value = e.target.value

            // Prise en compte de la possible présence de tags pour la liste à filtrer
            RecipeList = this.fetchedList
            if (this.activeTags.length > 0) {
                RecipeList = filterWithAllTags(this.activeTags, this.fetchedList)
            }

            // réinitialisations
            this.recipesWrapper.innerHTML = ""
            noResultMessage.innerHTML = ""

            // Au moins 3 caractères
            if (value && value.length > 2) {

                value = value.toLowerCase()
                let results = searchRecipes(value, RecipeList)
                //Si la fonction retourne des recettes, alors on met à jour la liste
                if (results.length > 0) {
                    this.recipesWrapper.innerHTML = ""
                    this.currentRecipeList = results
                } else {
                    // Sinon on affiche un message d'erreur, et on met à jour la liste
                    this.recipesWrapper.innerHTML = ""
                    this.currentRecipeList = this.results
                    noResultMessage.innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez
                    chercher « tarte aux pommes », « poisson » etc...`
                }

                //moins de 3 caractères,
                // précisement dans le cas ou l'on aurait retiré un caractère pour passer de 3 à 2 
            } else {
               //si au moins un tag est actif, alors on affiche le résultat de filterWithAllTags
               //Sinon on affiche toutes les recettes
                        this.currentRecipeList = RecipeList
            }
            this.display()
        })
    }
}



let api = new RecipeApi('data/recipes.json').getRecipes()
let noResultMessage = document.querySelector('.no-result-message')

const app = new App(api);
app.init()
