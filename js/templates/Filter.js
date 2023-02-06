class Filter {
  constructor(filter, recipesData) {
    this._filter = filter
    this._recipesData = recipesData
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
      console.log(`${this._filter} was clicked`)

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
    // console.log(this._recipesData)
    const ingredientsList = []
    const appliancesList = []
    const ustensilsList = []

    const FilterListContainer = document.querySelector(`.filter__${this._filter}--list`);


    FilterListContainer.innerHTML = '';


    if (this._filter === 'ingredients') {

      this._recipesData.forEach((recipe) => {

        recipe.ingredients.forEach(({
          ingredient

        }) => {

          if (ingredientsList.includes(ingredient.toLowerCase()) === false) {
            ingredientsList.push(ingredient.toLowerCase());
            const filterItem = document.createElement('li');
            filterItem.classList.add(`.filter__${this._filter}--items`);
            filterItem.innerText = ingredient;
            FilterListContainer.appendChild(filterItem);
          }
        });
      });
      // console.log(ingredientsList)
    }

    if (this._filter === 'appliances') {
      console.log(this._recipesData)
      this._recipesData.forEach((recipe) => {

        let appliance = recipe.appliance


        if (appliancesList.includes(appliance.toLowerCase()) === false) {
          appliancesList.push(appliance.toLowerCase());
          const filterItem = document.createElement('li');
          filterItem.classList.add(`.filter__${this._filter}--items`);
          filterItem.innerText = appliance;
          FilterListContainer.appendChild(filterItem);
        }

      });
      console.log(appliancesList)
    }

    if (this._filter === 'ustensils') {

      this._recipesData.forEach((recipe) => {

        recipe.ustensils.forEach((ustensil) => {
          console.log(ustensil)

          if (ustensilsList.includes(ustensil) === false) {
            ustensilsList.push(ustensil);
            const filterItem = document.createElement('li');
            filterItem.classList.add(`.filter__${this._filter}--items`);
            filterItem.innerText = ustensil;
            FilterListContainer.appendChild(filterItem);
          }
        });
      });

    }






  }

  createFilterTags() {
    console.log('test')

    const filterItems= document.getElementsByClassName(`.filter__${this._filter}--items`);
    const wrapper= document.querySelector(`.tag__${this._filter}--wrapper`);
   
    
        Array.from(filterItems).forEach((element) => {
          element.addEventListener('click', (e) => {
            console.log(element.innerHTML)
            const tagContainer = document.createElement('ul');
            tagContainer.setAttribute('class', 'tag__ingredient');
           
    
            let  tagTemplate =`
            <div class="tag__${this._filter}">
              <li class="tag-${this._filter}">${element.innerHTML}</li>
              <span><i class="fa fa-circle-xmark" style="cursor: pointer; width: 20px;"></i>
              </span>
            </div>
            `
            tagContainer.innerHTML=tagTemplate
            wrapper.appendChild(tagContainer)
           
          });
          
    
        });
    
    
    
      }
     
}