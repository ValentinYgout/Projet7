let api = new RecipeApi('data/recipes.json').getRecipes()

class App {
    recipesData;
    DatafromApi;
    recipesWrapper;
    filtersWrapper;
    resultFromTags
 
    constructor(DataFromApi) {

        this.recipesWrapper = document.querySelector('#recipes__cards')
        this.DatafromApi = DataFromApi
        this.recipesData=this.DatafromApi
        this.filtersWrapper = document.querySelector(`#filters`)
        this.resultFromTags=[]

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
            filterTemplate.filterKeyInput()

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
                // this.recipesWrapper.innerHTML = ""
                if(this.resultFromTags.length>0){

                    this.recipesData = this.resultFromTags
                    this.init()
                    noResultMessage.innerHTML = ` Nous avons trouvé ${this.recipesData.length} résultats`

                }
                else{
                    
                    this.recipesData = RecipeList
                    this.init()
                    console.log(this.recipesData)
                    noResultMessage.innerHTML = ` Nous avons trouvé ${this.recipesData.length} résultats`

                }
                // noResultMessage.innerHTML = ""


            }
        })

        
        const filterElements= document.getElementsByClassName(`.filter__items`);
        
       console.log(Array.from(filterElements))

       Array.from(filterElements).forEach((element) => {
        element.addEventListener('click', (e) => {
            console.log(element.innerHTML,"from app")

            let filterValue = element.innerHTML
             filterValue = filterValue.toLowerCase()
             const filterResults = searchWithFilters(filterValue, RecipeList)
             console.log( filterResults, "result")
             this.recipesWrapper.innerHTML = ""
             noResultMessage.innerHTML = ` Nous avons trouvé ${filterResults.length} résultats`
             this.recipesData = filterResults
             this.resultFromTags=filterResults
             console.log(this.resultFromTags)
             this.init()
             this.SearchAndUpdate()
         
         
        });
        
  
      });



      


      const closeTag= document.getElementsByClassName(`fa-circle-xmark`);
      let TagCount=  document.querySelectorAll(`#tags__selected .selected-tag`).length
      
      
      
      
      Array.from(closeTag).forEach((element) => {
          element.addEventListener('click', (e) => {
            console.log("how many tags",TagCount)
           console.log(e.target.parentNode.parentNode.parentNode)


          
           
           if(this.TagCount=1){
               
               e.target.parentNode.parentNode.parentNode.remove()
               this.recipesWrapper.innerHTML = ""
               console.log("recipedata",this.recipesData,"and recipe list",RecipeList)
               this.recipesData = this.DatafromApi
               this.init()
               noResultMessage.innerHTML = ` Nous avons trouvé ${this.recipesData.length} résultats`
            }
            else{
            console.log("tags to calc")
            
            console.log(this.recipesData)

        }
         
         
        });
        
  
      });
      
            
//         filterElements.forEach(function(elem) {
//             elem.addEventListener('click'),(e)=>{
//                 let filterValue = e.target.value
//                 filterValue = filterValue.toLowerCase()
//                 console.log("we need this to work")
//                 const Filterresults = searchWithFilters(filterValue, RecipeList)
//                 console.log( Filterresults, "result")
//                 this.recipesWrapper.innerHTML = ""
//                 noResultMessage.innerHTML = ` Nous avons trouvé ${results.length} résultats`
//                 this.recipesData = results
//                 this.init()
    
//             }
//         });


    }

}




const app = new App(api);


app.init()
app.SearchAndUpdate()