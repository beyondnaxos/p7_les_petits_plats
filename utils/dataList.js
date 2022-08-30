const ingredientsDataList = document.querySelector('#ingredientsList')

export const getIngredients = (datasProxy) => {
  let ingredients = []
  datasProxy.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.push(ingredient.ingredient)
    })
  })
  const uniqueIngredients = [...new Set(ingredients)]
  uniqueIngredients.forEach((ingredient) => {
    const option = document.createElement('option')
    option.value = ingredient
    ingredientsDataList.appendChild(option)
  })
}
