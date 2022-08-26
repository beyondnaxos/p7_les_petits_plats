import { recipes } from './data/recipes.js'

console.log(recipes)

let actualRecipe = []

let arrOfActualRecipe = []

recipes.forEach((recipes) => {
  arrOfActualRecipe.push(recipes)
})

const displayRecipes = (recipes, xList) => {
  recipes.forEach((el) => {
    const recipe = document.createElement('article')
    recipe.classList.add('recipe')
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


const searchBar = document.querySelector('#search__input')
searchBar.addEventListener('input', (e) => {
  
  const searchValue = e.target.value
  for (let i = 0; i < actualRecipe.length; i++) {

    if (
      arrOfActualRecipe[i].name
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ) {
      actualRecipe[i].style.display = 'block'
    } else {
      actualRecipe[i].style.display = 'none'
    }
  }
})

displayRecipes(arrOfActualRecipe, actualRecipe)



function searchBigData(bigData, searchText) {
  return bigData.filter((entry) =>
    entry.ingredients.some((item) =>
      item.ingredient.toLowerCase().includes(searchText)
    )
  )
}

const searchBarIngredients = document.querySelector(
  '#search__input-ingredients'
)

searchBarIngredients.addEventListener('input', (e) => {
  let searchValue = e.target.value
  for (let i = 0; i < actualRecipe.length; i++) {
    console.log(searchBigData(arrOfActualRecipe, searchValue.toLowerCase()))
    if (searchBigData(arrOfActualRecipe, searchValue.toLowerCase())[i]) {
      actualRecipe[i].style.display = 'block'
    } else {
      actualRecipe[i].style.display = 'none'
    }
  }
})

console.log(arrOfActualRecipe)

