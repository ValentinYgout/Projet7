function createTagXMarkEvent(){
  console.log("createTagXMarkEvent()")
    const closeTag= document.getElementsByClassName(`fa-circle-xmark`);
    Array.from(closeTag).forEach((element) => {
      console.log(element)
        element.addEventListener('click', (e) => {
          console.log( app.activeTags.length)
          
         
            const newTagList = app.activeTags.filter(function (tag) {
              return tag !== e.target.parentNode.parentNode.outerText.trim().toString().toLowerCase();
          });
         app.activeTags=newTagList
          // console.log(app.activeTags.length)
      
          e.target.parentNode.parentNode.parentNode.remove()
          app.recipesWrapper.innerHTML = ""
          app.currentRecipeList = filterAfterDeletingTag(app.activeTags,app.fetchedList)
          app.display()
        });     
      });

}
 
