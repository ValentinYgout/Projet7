class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        const data = await fetch (this._url);
        let  result = (await data.json()).recipes;
      return result

    }
}




class RecipeApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getRecipes() {
        return await this.get()
    }
}