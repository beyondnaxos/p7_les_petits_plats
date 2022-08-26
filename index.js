import { recipes } from './data/recipes.js'

let actualRecipe = []

let arrOfActualRecipe = []

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
  console.time('search')
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
  console.timeEnd('search')
}

const inputs = document.querySelectorAll('input')
inputs.forEach((input) => input.addEventListener('input', handleSearch))




