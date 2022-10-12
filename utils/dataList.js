const ingredientsDataList = document.querySelector('#ingredientsList')
const appliancesDataList = document.querySelector('#appliancesList')
const ustensilDataList = document.querySelector('#ustensilsList')

export const getIngredients = (datasProxy) => {
  let ingredients = []
  datasProxy.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.push(ingredient.ingredient)
    })
  })
  const uniqueIngredients = [...new Set(ingredients)]
  // console.log(uniqueIngredients)
  return uniqueIngredients
}

export const getAppliiances = (datasProxy) => {
  let appliances = []
  datasProxy.recipes.forEach((recipe) => {
    appliances.push(recipe.appliance)
  })
  const uniqueAppliances = [...new Set(appliances)]
  // console.log(uniqueAppliances)
  return uniqueAppliances
}

export const getUstensils = (datasProxy) => {
  let ustensils = []
  datasProxy.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.push(ustensil)
    })
  })
  const uniqueUstensils = [...new Set(ustensils)]
  // console.log(uniqueUstensils)
  return uniqueUstensils
}




// export const getUstensils = (datasProxy) => {
//   let ustensils = []
//   datasProxy.recipes.forEach((recipe) => {
//     recipe.ustensils.forEach((ustensil) => {
//       ustensils.push(ustensil)
//     })
//   })
//   const uniqueUstensils = [...new Set(ustensils)]
//   uniqueUstensils.forEach((ustensil) => {
//     const option = document.createElement('option')
//     option.value = ustensil
//     ustensilDataList.appendChild(option)
//   })
//   return uniqueUstensils
// }
