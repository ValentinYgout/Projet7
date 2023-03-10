class Filter {
  ingredientsList;
  ustensilsList;
  appliancesList;

  constructor(filter, recipesData) {
    this._filter = filter
    this._recipesData = recipesData
    this.ingredientsList = []
    this.appliancesList = []
    this.ustensilsList = []

  }

  createFilter() {
    const $wrapper = document.createElement('div')
    $wrapper.classList.add(`filter__${this._filter}--template`)

    let filterElement =
      `
      
             <div class="filter__${this._filter}--close">
                 <header class="filter__${this._filter}--header">
                   <h2 class="filter__${this._filter}--name">${this._filter}</h2>
                   <span class="filter__${this._filter}--angleDown">
                   <i class="fa fa-angle-down ${this._filter}ArrowDown"></i>
                   </span>
                 </header>
                 <input id="${this._filter}-input" placeholder="Sélectionner un ${this._filter}..." class="filter__${this._filter}--input" style="display: none;">
                 <span class="filter__${this._filter}--angleUp">
                     <i class="fa fa-angle-up ${this._filter}ArrowUp "  display: none;"></i>
                 </span>
             <ul class="filter__${this._filter}--list" style="display: none;"></ul>
         </div>
     
       `
    $wrapper.innerHTML = filterElement

    return $wrapper

  }

  createToggleArrows() {
    let arrowDown = document.querySelector(`.${this._filter}ArrowDown`)
    let arrowUp = document.querySelector(`.${this._filter}ArrowUp`)
    let article = document.querySelector(`.filter__${this._filter}--close`)
    let header = document.querySelector(`.filter__${this._filter}--header`)
    let input = document.querySelector(`#${this._filter}-input`)
    let template = document.querySelector(`.filter__${this._filter}--template`)
    let listBox = document.querySelector(`.filter__${this._filter}--list`)


    arrowDown.addEventListener('click', (e) => {
      // console.log(`${this._filter} was clicked`)

      if (arrowDown.classList.contains(`ingredientsArrowDown`)) {
        document.querySelector('.appliancesArrowUp').click()
        document.querySelector('.ustensilsArrowUp').click()
      }

      if (arrowDown.classList.contains(`appliancesArrowDown`)) {
        document.querySelector('.ingredientsArrowUp').click()
        document.querySelector('.ustensilsArrowUp').click()
      }

      if (arrowDown.classList.contains(`ustensilsArrowDown`)) {
        document.querySelector('.appliancesArrowUp').click()
        document.querySelector('.ingredientsArrowUp').click()
      }


      article.classList.add(`filter__${this._filter}--view`);
      article.classList.remove(`filter__${this._filter}--close`);
      header.style.display = 'none';
      input.style.display = 'flex';
      arrowDown.style.display = 'none';
      arrowUp.style.display = 'flex';
      template.style.width = '650px';
      listBox.style.display = 'flex';
    });

    arrowUp.addEventListener('click', (e) => {


      article.classList.add(`filter__${this._filter}--close`);
      article.classList.remove(`filter__${this._filter}--view`);
      header.style.display = 'flex';
      input.style.display = 'none';
      arrowDown.style.display = 'flex';
      arrowUp.style.display = 'none';
      template.style.width = '170px';
      listBox.style.display = 'none';


    });



  }




  fillList() {


    const FilterListContainer = document.querySelector(`.filter__${this._filter}--list`);


    FilterListContainer.innerHTML = '';


    if (this._filter === 'ingredients') {

      this._recipesData.forEach((recipe) => {

        recipe.ingredients.forEach(({
          ingredient

        }) => {
          this.ingredientsList.push(ingredient.toLowerCase());
        });
      });

      this.ingredientsList = [... new Set(this.ingredientsList)]
      this.ingredientsList = this.ingredientsList.sort()
      this.ingredientsList.forEach(ingredient => {

        const filterItem = document.createElement('li');
        filterItem.classList.add(`.filter__${this._filter}--items`)
        filterItem.classList.add(`.filter__items`);
        filterItem.innerText = ingredient;
        FilterListContainer.appendChild(filterItem);
      }


      );





    }

    if (this._filter === 'appliances') {
      // console.log(this._recipesData)
      this._recipesData.forEach((recipe) => {

        let appliance = recipe.appliance

        this.appliancesList.push(appliance.toLowerCase());

      });

      this.appliancesList = [... new Set(this.appliancesList)]
      this.appliancesList = this.appliancesList.sort()
      this.appliancesList.forEach(appliance => {

        const filterItem = document.createElement('li');
        filterItem.classList.add(`.filter__${this._filter}--items`);
        filterItem.classList.add(`.filter__items`);
        filterItem.innerText = appliance;
        FilterListContainer.appendChild(filterItem);
      })



    }

    if (this._filter === 'ustensils') {

      this._recipesData.forEach((recipe) => {

        recipe.ustensils.forEach((ustensil) => {
          

          this.ustensilsList.push(ustensil);
        });
      });

      this.ustensilsList = [... new Set(this.ustensilsList)]
      this.ustensilsList = this.ustensilsList.sort()
      this.ustensilsList.forEach(ustensil => {

        const filterItem = document.createElement('li');
        filterItem.classList.add(`.filter__${this._filter}--items`);
        filterItem.classList.add(`.filter__items`);
        filterItem.innerText = ustensil;
        FilterListContainer.appendChild(filterItem);
      })


    }
  }


  async filterKeyInput() {

    const filterItemsInput = document.getElementsByClassName(`filter__${this._filter}--input`);
    // console.log(this._filter, "array?", Array.from(filterItemsInput))
    Array.from(filterItemsInput).forEach((element) => {
      // console.log(this.ingredientsList)
      element.addEventListener('input', (e) => {
        console.log(e.target.id)

        // const appliancesList = []
        // const ustensilsList = []


        if (e.target.id === 'ingredients-input') {
          const FilterListContainer = document.querySelector(`.filter__ingredients--list`);
          console.log("filtercontainer!!", FilterListContainer)

          FilterListContainer.innerHTML = ""
          console.log("filtercontainer!!", FilterListContainer)

          console.log(this.ingredientsList)
          let NewList = this.ingredientsList.filter(ingredient => ingredient.includes(e.target.value))
          NewList.forEach(ingredient => {


            const filterItem = document.createElement('li');
            filterItem.classList.add(`.filter__ingredients--items`);
            filterItem.classList.add(`.filter__items`);
            filterItem.innerText = ingredient;
            FilterListContainer.appendChild(filterItem);
            this.createFilterTags("ingredients")

          })
        }
        if (e.target.id === 'ustensils-input') {
          const FilterListContainer = document.querySelector(`.filter__ustensils--list`);
          console.log("filtercontainer!!", FilterListContainer)

          FilterListContainer.innerHTML = ""
          console.log("filtercontainer!!", FilterListContainer)

          console.log(this.ustensilsList)
          let NewList = this.ustensilsList.filter(ustensil => ustensil.includes(e.target.value))
          NewList.forEach(ustensil => {


            const filterItem = document.createElement('li');
            filterItem.classList.add(`.filter__ustensils--items`);
            filterItem.classList.add(`.filter__items`);
            filterItem.innerText = ustensil;
            FilterListContainer.appendChild(filterItem);
            this.createFilterTags("ustensils")

          })
        }

        if (e.target.id === 'appliances-input') {
          const FilterListContainer = document.querySelector(`.filter__appliances--list`);
          console.log("filtercontainer!!", FilterListContainer)

          FilterListContainer.innerHTML = ""
          console.log("filtercontainer!!", FilterListContainer)

          console.log(this.appliancesList)
          let NewList = this.appliancesList.filter(appliance => appliance.includes(e.target.value))
          NewList.forEach(appliance => {


            const filterItem = document.createElement('li');
            filterItem.classList.add(`.filter__appliances--items`);
            filterItem.classList.add(`.filter__items`);
            filterItem.innerText = appliance;
            FilterListContainer.appendChild(filterItem);
            this.createFilterTags("appliances")

          })
        }
      })
    })


  }

  createFilterTags(filter) {


    // console.log('test')

    const filterItems = document.getElementsByClassName(`.filter__${filter}--items`);
    const wrapper = document.querySelector(`.tag__${filter}--wrapper`);


    Array.from(filterItems).forEach((element) => {
      element.addEventListener('click', (e) => {
        if (app.activeTags.includes(element.innerHTML.toLowerCase())) {
          console.log("already have this tag")
          return
        }
        console.log("added new tag")
        // console.log(element.innerHTML, "from filter")
        const tagContainer = document.createElement('div');
        tagContainer.setAttribute('class', `tag__${filter}`);
        tagContainer.classList.add(`selected-tag`);
        // console.log(element.innerHTML)
        app.activeTags.push(element.innerHTML.toLowerCase())

        let filterValue = element.innerHTML.toLowerCase()

        const regex = /\s|'/g
        let filterValueNoSpace = filterValue.replace(regex,'')
        console.log(filterValueNoSpace)


        let tagTemplate = `
          
              <div class="tag-${filter} ${filterValueNoSpace}">${element.innerHTML}</li>
              <span><i class="fa-regular fa-circle-xmark" style="cursor: pointer; width: 20px;"></i>
              </span>
            
            `
        tagContainer.innerHTML = tagTemplate
        wrapper.appendChild(tagContainer)

        const filterResults = searchWithFilters(filterValue, this._recipesData)
        //  console.log( filterResults, "result")
        app.recipesWrapper.innerHTML = ""
        app.currentRecipeList = filterResults
        app.resultFromTags = filterResults
        app.display()

        console.log(filterValueNoSpace)
        const closeTag = document.querySelector(`.${filterValueNoSpace} .fa-circle-xmark`);
        console.log(`${filterValueNoSpace} .fa-circle-xmark`)


        console.log(filterValueNoSpace)
        const searchInput = document.querySelector('.search__input')
        closeTag.addEventListener('click', (e) => {
          console.log(app.activeTags.length)


          const newTagList = app.activeTags.filter(function (tag) {
            return tag !== e.target.parentNode.parentNode.outerText.trim().toString().toLowerCase();
          });
          app.activeTags = newTagList
          // console.log(app.activeTags.length)

          e.target.parentNode.parentNode.parentNode.remove()
          app.recipesWrapper.innerHTML = ""

          // if (app.activeTags.length == 0) {
            console.log(searchInput.value)
            app.resultFromTags = ""
            if (searchInput.value.length > 2) {
              console.log("should do something")
              app.currentRecipeList = searchRecipes(searchInput.value, app.fetchedList)

            }
            else {

              app.currentRecipeList = app.fetchedList
            }
          // }
          // else {
            app.currentRecipeList = filterAfterDeletingTag(app.activeTags, app.currentRecipeList)
          // }
          app.display()
        });


      });


    });




  }


}