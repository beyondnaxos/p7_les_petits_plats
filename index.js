import { recipes } from './data/recipes.js'

import {
  getIngredients,
  getAppliiances,
  getUstensils,
} from './utils/dataList.js'

import { displayRecipes } from './utils/articleModel.js'

import {
  searchIngredients,
  searchAppliance,
  searchUstensil,
} from './utils/searchEngine.js'

import { filterData } from './utils/searchEngine.js'
// import {createFilterContainerForIngredients} from './utils/filterTag.js'

let datas = {}
datas.recipes = [...recipes]
console.log(datas)
datas.allIngredients = getIngredients(datas)
datas.allAppliances = getAppliiances(datas)
datas.allUstensils = getUstensils(datas)

console.log(datas)

let datasProxy = new Proxy(datas, {

  set: function (target, key, value) {

    target[key] = value
    
    
    if (key == 'recipes') {
      const container = document.querySelector('.container')
      container.innerHTML = ''
      datasProxy.appliances = getAppliiances(datasProxy)
      datasProxy.ingredients = getIngredients(datasProxy)
      datasProxy.ustensils = getUstensils(datasProxy)
      console.log(datasProxy.ustensils)
      
       target[key].map((recipe) => {
        console.log(recipe)
        displayRecipes(recipe)
        return true
      })
    }

    if (key === 'appliances') {
      //lister les appliances dans ma liste déroulante
      const appliancesDataList = document.querySelector('#applianceList')
      appliancesDataList.innerHTML = ''
      value.forEach((appliance) => {
        const option = document.createElement('option')
        option.value = appliance
        appliancesDataList.appendChild(option)
      })
    }

    if (key === 'searchType') {
      filterData(value, datas, datasProxy)
    }

    if (key === 'ingredients') {
      const ingredientsDataList = document.querySelector('#ingredientsList')
      ingredientsDataList.innerHTML = ''
      console.log('ingredients', value)
      value.forEach((ingredient) => {
        const option = document.createElement('li')
        option.value = ingredient
        option.classList.add('ingredientsLi')
        option.innerText = ingredient
        // option.style.display = 'none'
        ingredientsDataList.style.display = 'none'
        ingredientsDataList.appendChild(option)
        
      })
    }



    // if (key === 'ingredients') {
    //   const ingredientsDataList = document.querySelector('#ingredientsList')
    //   ingredientsDataList.innerHTML = ''
    //   console.log('ingredients', value)
    //   value.forEach((ingredient) => {
    //     const option = document.createElement('li')
    //     option.innerText = ingredient
    //     ingredientsDataList.appendChild(option)
    //   })
    // }

    if (key === 'ustensils') {
      const ustensilsDataList = document.querySelector('#ustensilsList')
      ustensilsDataList.innerHTML = ''
      value.forEach((ustensil) => {
        const option = document.createElement('option')
        option.value = ustensil
        ustensilsDataList.appendChild(option)
      })
    }

    return true
  },
})

console.log(datasProxy)
datasProxy.recipes = [...recipes]
datasProxy.searchLength = 0

document.querySelector('#search__input').addEventListener('input', (e) => {
  const str = e.target.value
  datasProxy.mainSearch = str
  if (str.length >= 3 && str.length > datas.searchLength) {
    const filter = datas.recipes.filter((elt) =>  
      elt.name.toLowerCase().includes(str.toLowerCase()) ||
      elt.description.toLowerCase().includes(str.toLowerCase()) ||
      elt.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(str.toLowerCase())
      ) ||
      elt.appliance.toLowerCase().includes(str.toLowerCase()) ||
      elt.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(str.toLowerCase())
      )
    )
    datasProxy.recipes = [...filter]
    console.log(datasProxy.recipes)
  } else {
    datasProxy.recipes = [...recipes]
  }
  datasProxy.searchLength = str.length
})

searchIngredients(datasProxy, datas, recipes)
searchAppliance(datasProxy, datas, recipes)
searchUstensil(datasProxy, datas, recipes)

// getIngredients(datas)
// getAppliiances(datas)
// getUstensils(datas)


const searchIngInput = document.querySelector('#search__input-ingredients')
const searchIngContainer = document.querySelector('.test')
const bigSearchIngredient = document.querySelector('.filterIngredient')
const ingUl = document.querySelector('#ingredientsList')
let clicked = false

searchIngInput.addEventListener('click', (e) => {

  if (clicked === false) {
    ingUl.style.display = 'block'
    searchIngInput.style.width = '100%'
    searchIngContainer.style.width = '100%'
    bigSearchIngredient.style.width = '800px'
    searchIngInput.style.borderRadius = '5px 5px 0 0'
    ingUl.style.width = '900px'
    clicked = true
  } else {
    
    ingUl.style.display = 'none'
    searchIngContainer.style.width = '170px'
    searchIngInput.style.width = '170px'
    bigSearchIngredient.style.width = '170px'
    searchIngInput.style.borderRadius = '5px'
    
  
    clicked = false
  }
})