import { recipes } from './data/recipes.js'

let actualRecipe = []

let arrOfActualRecipe = []

let selectedItem = []

recipes.forEach((recipes) => {
  arrOfActualRecipe.push(recipes)
})

const displayRecipes = (recipes, xList) => {
  recipes.forEach((el) => {
    const recipe = document.createElement('article')
    recipe.classList.add('recipe')
    recipe.dataset.id = el.id
    // handle Image Prototype
    const img = new Image()
    img.src = './assets/recipes_photos/limonade_coco.jpg'
    recipe.appendChild(img)
    img.classList.add('recipe__image')

    // handle  texts Container Prototype
    const textsContainer = document.createElement('div')
    textsContainer.classList.add('recipe__texts')
    recipe.appendChild(textsContainer)

    // handle  title and Ingredients + time and Instructions Container Prototype
    const titleIngredientsContainer = document.createElement('div')
    const timeAndInstructionsContainer = document.createElement('div')
    titleIngredientsContainer.classList.add('recipe__title-ingredients')
    timeAndInstructionsContainer.classList.add('recipe__time-instructions')

    textsContainer.appendChild(titleIngredientsContainer)
    textsContainer.appendChild(timeAndInstructionsContainer)

    // handle  title Prototype
    const title = document.createElement('h2')
    title.classList.add('recipe__title')
    title.textContent = el.name

    titleIngredientsContainer.appendChild(title)

    // handle  ingredients Prototype
    const ingredients = document.createElement('ul')
    ingredients.classList.add('recipe__ingredients')

    el.ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement('li')
      ingredientItem.classList.add('recipe__ingredient')
      if (ingredient.unit) {
        ingredientItem.textContent =
          ingredient.ingredient +
          ' : ' +
          ingredient.quantity +
          ' ' +
          ingredient.unit
      } else if (
        ingredient.ingredient &&
        ingredient.quantity &&
        !ingredient.unit
      ) {
        ingredientItem.textContent =
          ingredient.ingredient + ' : ' + ingredient.quantity
      } else if (
        ingredient.ingredient &&
        !ingredient.quantity &&
        !ingredient.unit
      ) {
        ingredientItem.textContent = ingredient.ingredient
      }
      ingredients.appendChild(ingredientItem)
    })

    titleIngredientsContainer.appendChild(ingredients)

    //  handle  time Prototype

    const time = document.createElement('div')
    time.classList.add('recipe__time')
    time.innerHTML =
      "<img class='time__image' src='./assets/icons/clockIcon.png'></img>" +
      `<p class='time-duration'>${el.time} min</p>`
    timeAndInstructionsContainer.appendChild(time)

    //  handle  instructions Prototype
    const instructions = document.createElement('div')
    instructions.classList.add('recipe__instructions')

    const instructionContent = el.description

    const instruction = document.createElement('p')
    instruction.classList.add('recipe__instruction')
    instruction.textContent = instructionContent
    instructions.appendChild(instruction)

    timeAndInstructionsContainer.appendChild(instructions)

    document.querySelector('#recipes').appendChild(recipe)
    xList.push(recipe)
  })
}

displayRecipes(arrOfActualRecipe, actualRecipe)

const recipeReduce = recipes.reduce((recipeObj, currentRecipe) => {
  const { id } = currentRecipe
  recipeObj[id] = currentRecipe

  return recipeObj
}, {})

console.log(recipeReduce)

const recipesDiv = document.querySelectorAll('.recipe')
const inputName = document.querySelector('#search__input')
const inputIngredients = document.querySelector('#search__input-ingredients')
const inputAppliance = document.querySelector('#search__input-appliance')
const inputUstensil = document.querySelector('#search__input-ustensils')

const checkIngredients = (ingredients, inputValue) => {
  return ingredients.some(({ ingredient }) => {
    return ingredient.toLowerCase().includes(inputValue.toLowerCase())
  })
}

const checkName = (name, inputValue) => {
  return name.toLowerCase().includes(inputValue.toLowerCase())
}

const checkUstensils = (ustensils, inputValue) => {
  return ustensils.some((ustensil) => {
    return ustensil.toLowerCase().includes(inputValue.toLowerCase())
  })
}

const checkAppliance = (appliance, inputValue) =>
  appliance.toLowerCase().includes(inputValue.toLowerCase())

const handleSearch = () => {
  const inputNameValue = inputName.value
  const inputIngredientsValue = inputIngredients.value
  const inputApplianceValue = inputAppliance.value
  const inputUstensilValue = inputUstensil.value

  recipesDiv.forEach((recipeDiv) => {
    const recipeId = recipeDiv.dataset.id
    const { name, ingredients, ustensils, appliance } = recipeReduce[recipeId]

    const includeName = checkName(name, inputNameValue)
    const includeUstensils = checkUstensils(ustensils, inputUstensilValue)
    const includeAppliance = checkAppliance(appliance, inputApplianceValue)
    const includeIngredient = checkIngredients(
      ingredients,
      inputIngredientsValue
    )

    includeName && includeUstensils && includeAppliance && includeIngredient
      ? recipeDiv.classList.remove('hide')
      : recipeDiv.classList.add('hide')
  })
}

const inputs = document.querySelectorAll('input')
inputs.forEach((input) => input.addEventListener('input', handleSearch))

const ingredientsDataList = document.querySelector('#ingredientsList')
const applianceDataList = document.querySelector('#appliancesList')
const ustensilsDataList = document.querySelector('#ustensilsList')

//  get ingredients , remove duplicates and display them in the data list
const getIngredients = () => {
  const ingredients = []
  arrOfActualRecipe.forEach((recipe) => {
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

const getAppliiances = () => {
  const appliances = []
  arrOfActualRecipe.forEach((recipe) => {
    appliances.push(recipe.appliance)
  })
  const uniqueAppliances = [...new Set(appliances)]
  uniqueAppliances.forEach((appliance) => {
    const option = document.createElement('option')
    option.value = appliance
    applianceDataList.appendChild(option)
  })
}

const getUstensils = () => {
  const ustensils = []
  arrOfActualRecipe.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.push(ustensil)
    })
  })
  const uniqueUstensils = [...new Set(ustensils)]
  uniqueUstensils.forEach((ustensil) => {
    const option = document.createElement('option')
    option.value = ustensil
    ustensilsDataList.appendChild(option)
  })
}

getIngredients()
getAppliiances()
getUstensils()

const beforeContainer = document.querySelector('.before-container')

const createFilter = (filterValue) => {
  const filter = document.createElement('div')
  filter.classList.add('filter-button-stamp')
  filter.innerHTML = ` <p>${filterValue}</p>`
  return filter
}

const createFilterContainer = (filterValue) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('filter-container')
  filterContainer.appendChild(createFilter(filterValue))

  return filterContainer
}

const createFilterContainerForIngredients = (filterValue) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('filter-container')
  filterContainer.appendChild(createFilter(filterValue))

  return filterContainer
}

const createFilterContainerForAppliances = (filterValue) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('filter-container')
  filterContainer.appendChild(createFilter(filterValue))

  return filterContainer
}

const createFilterContainerForUstensils = (filterValue) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('filter-container')
  filterContainer.appendChild(createFilter(filterValue))

  return filterContainer
}

const showFilters = () => {
  beforeContainer.innerHTML = ''
  const filterValue = inputIngredients.value
  const filterValue2 = inputAppliance.value
  const filterValue3 = inputUstensil.value

  if (filterValue !== '') {
    beforeContainer.appendChild(
      createFilterContainerForIngredients(filterValue)
    )
  }
  if (filterValue2 !== '') {
    beforeContainer.appendChild(
      createFilterContainerForAppliances(filterValue2)
    )
  }
  if (filterValue3 !== '') {
    beforeContainer.appendChild(createFilterContainerForUstensils(filterValue3))
  }
}

const removeFilters = (filterContainer) => {
  filterContainer.innerHTML = ''
}

console.log(inputIngredients.currentTarget)

//  on change on input ingredients, show filters in the filter container
inputIngredients.addEventListener('change', () => {
  showFilters()
})

inputAppliance.addEventListener('change', () => {
  showFilters()
})

inputUstensil.addEventListener('change', () => {
  showFilters()
})

// remove filters if empty input
inputIngredients.addEventListener('input', () => {
  if (inputIngredients.value === '') {
    removeFilters(beforeContainer)
  }
})

inputAppliance.addEventListener('input', () => {
  if (inputAppliance.value === '') {
    removeFilters(beforeContainer)
  }
})

inputUstensil.addEventListener('input', () => {
  if (inputUstensil.value === '') {
    removeFilters(beforeContainer)
    // only remove filter before container nth:child(3)
  }
})

// tests
export const searchAppliance = (datasProxy, datas, recipes) => {
  document
    .querySelector('#search__input-appliance')
    .addEventListener('input', (e) => {
      const str = e.target.value
      console.log(datas)
      if (str.length >= 3 && str.length > datas.searchLength) {
        const filter = datas.recipes.filter((elt) =>
          elt.appliance.toLowerCase().includes(str.toLowerCase())
        )
        datasProxy.applianceTag = [str.toLowerCase()]
        datasProxy.recipes = [...filter]
        datasProxy.appliances = getAppliiances(datasProxy)
      } else if (str == '') {
        datasProxy.recipes = [...recipes]
        if (datasProxy.mainSearch) {
          const filter = datas.recipes.filter((elt) =>
            elt.name.toLowerCase().includes(datasProxy.mainSearch.toLowerCase())
          )
          datasProxy.recipes = [...filter]
        }
      }
      datasProxy.searchLength = str.length
    })
}

export const searchUstensil = (datasProxy, datas, recipes) => {
  document
    .querySelector('#search__input-ustensils')
    .addEventListener('input', (e) => {
      const str = e.target.value
      console.log(datas)
      if (str.length >= 3 && str.length > datas.searchLength) {
        const filter = datas.recipes.filter((elt) =>
          elt.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(str.toLowerCase())
          )
        )
        datasProxy.ustensilTag = [str.toLowerCase()]
        datasProxy.recipes = [...filter]
        datasProxy.ustensils = getUstensils(datasProxy)
      } else if (str == '') {
        datasProxy.recipes = [...recipes]
        if (datasProxy.mainSearch) {
          const filter = datas.recipes.filter((elt) =>
            elt.name.toLowerCase().includes(datasProxy.mainSearch.toLowerCase())
          )
          datasProxy.recipes = [...filter]
        }
      }
      datasProxy.searchLength = str.length
    })
}
