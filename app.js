let api = new RecipeApi('data/recipes.json').getRecipes()
class App {
    recipesData;
    recipesWrapper;
    filtersWrapper;
    constructor(DataFromApi) {

        this.recipesWrapper = document.querySelector('#recipes__cards')
        this.recipesData = DataFromApi
        this.filtersWrapper = document.querySelector(`#filters`)

    }







    async init() {

        let RecipeList = await this.recipesData

        console.log(this.recipesWrapper)
        // console.log(RecipeList.length, "inside")


        // console.log(recipesData)
        // recipesData.map(recipe => new Recipe(recipe))
        RecipeList.forEach(recipe => {

            const recipeTemplate = new RecipeCard(recipe)

            this.recipesWrapper.appendChild(recipeTemplate.createRecipeCard())

        })
        console.log(this.recipesWrapper)
        const FilterList = ['ingredients', 'appliances', 'ustensils']
        this.filtersWrapper.innerHTML = ""
        FilterList.forEach(filter => {
            const filterTemplate = new Filter(filter, RecipeList)
            this.filtersWrapper.appendChild(filterTemplate.createFilter())

            filterTemplate.createToggleArrows()

            filterTemplate.fillList()

            filterTemplate.createFilterTags()
        })








    }





    async SearchAndUpdate() {
        let noResultMessage = document.querySelector('.no-result-message')



        let RecipeList = await this.recipesData

        const searchInput = document.querySelector('.search__input')
        searchInput.addEventListener("input", (e) => {
         
            let value = e.target.value

        
            if (value && value.length > 2) {
            
                value = value.toLowerCase()
                console.log(RecipeList)
                const results = searchRecipes(value, RecipeList)
                if (results.length > 0) {

                    this.recipesWrapper.innerHTML = ""
                    noResultMessage.innerHTML = ` Nous avons trouvé ${results.length} résultats`
                    this.recipesData = results
                    this.init()
                } else {



                    this.recipesWrapper.innerHTML = ""
                    noResultMessage.innerHTML = "No matching results"
                    this.recipesData = api
                    this.init()
                }

            } else if (value.length<3) {
                this.recipesWrapper.innerHTML = ""
                this.recipesData = api
                this.init()


                noResultMessage.innerHTML = ""


            }
        })

        let filterElements= document.querySelectorAll('.filter__items');
        
    

        filterElements.forEach(function(elem) {
            elem.addEventListener('click'),(e)=>{
                let filterValue = e.target.value
                filterValue = filterValue.toLowerCase()
                console.log(filterValue)
                const Filterresults = searchRecipes(filterValue, RecipeList)
                console.log( Filterresults, "result")
                this.recipesWrapper.innerHTML = ""
                noResultMessage.innerHTML = ` Nous avons trouvé ${results.length} résultats`
                this.recipesData = results
                this.init()
    
            }
        });


    }

}




const app = new App(api);


app.init()
app.SearchAndUpdate()