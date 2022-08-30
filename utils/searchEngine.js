export const searchIngredients = (datasProxy, datas) => {
  document
    .querySelector('#search__input-ingredients')
    .addEventListener('input', (e) => {
      const str = e.target.value

      if (str.length >= 3 && str.length > datas.searchLength) {
        const filter = datasProxy.recipes.filter((elt) =>
          elt.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(str.toLowerCase())
          )
        )
        datasProxy.recipes = [...filter]
      } else {
        datasProxy.recipes = [...datasProxy.recipes]
      }
      datasProxy.searchLength = str.length
    })
}



