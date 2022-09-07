const ingredientsDataList = document.querySelector('#ingredientsList')
const appliancesDataList = document.querySelector('#applianceList')
const ustensilDataList = document.querySelector('#ustensilsList')

export const getIngredients = (datasProxy) => {
  let ingredients = []
  datasProxy.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.push(ingredient.ingredient)
      console.log(ingredients)
    })
  })
  const uniqueIngredients = [...new Set(ingredients)]
  console.log(uniqueIngredients)
  uniqueIngredients.forEach((ingredient) => {
    const option = document.createElement('option')
    option.value = ingredient
    ingredientsDataList.appendChild(option)
  })
}

export const getAppliiances = (datasProxy) => {
  let appliances = []
  datasProxy.recipes.forEach((recipe) => {
    appliances.push(recipe.appliance)
  }

  )
  const uniqueAppliances = [...new Set(appliances)]
  console.log(uniqueAppliances);
  return uniqueAppliances
  
  
}

export const getUstensils = (datasProxy) => {
  let ustensils = []
  datasProxy.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.push(ustensil)
    }
    )
  }
  )
  const uniqueUstensils = [...new Set(ustensils)]
  uniqueUstensils.forEach((ustensil) => {
    const option = document.createElement('option')
    option.value = ustensil
    ustensilDataList.appendChild(option)
  }
  )
}
