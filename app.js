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
        this.resultFromTags=[]
        this.currentRecipeList=[]
        this.fetchedList=[]
        this.activeTags=[]
    }



    async init(){
       
        this.fetchedList = await this.recipesData
        this.currentRecipeList = this.fetchedList
        app.display()
        app.SearchAndUpdate()  
    }



    async display() {
        
        console.log("display function")

        let RecipeList =  this.currentRecipeList

        // console.log(this.currentRecipeList)
        // console.log(RecipeList.length, "inside")


        // console.log(recipesData)
        // recipesData.map(recipe => new Recipe(recipe))
        // console.log(this.currentRecipeList,"before render")
        
        this.currentRecipeList.forEach(recipe => {

            const recipeTemplate = new RecipeCard(recipe)

            this.recipesWrapper.appendChild(recipeTemplate.createRecipeCard())

        })
        // console.log(this.recipesWrapper)
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
        // createTagXMarkEvent()



        



    }





    async SearchAndUpdate() {
    
        let RecipeList = this.currentRecipeList
          

        const searchInput = document.querySelector('.search__input')
        console.log('install event')
        searchInput.addEventListener("input", (e) => {
         
            let value = e.target.value

            this.recipesWrapper.innerHTML = ""
        
            if (value && value.length > 2) {
                console.log('>2')
            
                value = value.toLowerCase()
                const results = searchRecipes(value, RecipeList)
               
                if (results.length > 0) {
                    this.recipesWrapper.innerHTML = ""

                  
                    this.currentRecipeList = results
                } else {
                    this.recipesWrapper.innerHTML = ""
                    this.currentRecipeList = this.results
                    noResultMessage.innerHTML = `Aucune recette ne correspond à votre critère… vous pouvez
                    chercher « tarte aux pommes », « poisson » etc...`
                }

            } else {
                noResultMessage.innerHTML  = ""
                console.log(this.resultFromTags,this.resultFromTags.length)
                if(this.resultFromTags.length>0){
                    this.currentRecipeList = this.resultFromTags
                }
                else{
                    if(this.currentRecipeList!==this.fetchedList){
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
