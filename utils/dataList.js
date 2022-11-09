// get ingredients list from recipes
export const getIngredients = (datasProxy) => {
  let ingredients = []
  datasProxy.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.push(ingredient.ingredient)
    })
  })
  const uniqueIngredients = [...new Set(ingredients)]
  return uniqueIngredients
}

//  get appliances list from recipes
export const getAppliiances = (datasProxy) => {
  let appliances = []
  datasProxy.recipes.forEach((recipe) => {
    appliances.push(recipe.appliance)
  })
  const uniqueAppliances = [...new Set(appliances)]
  return uniqueAppliances
}

//  get ustensils list from recipes
export const getUstensils = (datasProxy) => {
  let ustensils = []
  datasProxy.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.push(ustensil)
    })
  })
  const uniqueUstensils = [...new Set(ustensils)]
  return uniqueUstensils
}

