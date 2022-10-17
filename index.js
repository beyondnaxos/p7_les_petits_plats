import { recipes } from './data/recipes.js'

import {
  getIngredients,
  getAppliiances,
  getUstensils,
} from './utils/dataList.js'

import { displayRecipes } from './utils/articleModel.js'

import {
  searchIngredients,
  searchAppliances,
  searchUstensils,
} from './utils/searchEngine.js'

import {
  filterData,
  handleIngSearch,
  handleAppSearch,
  handleUstSearch,
  createBlueTag,
  createGreenTag,
  createRedTag,
} from './utils/searchEngine.js'


let datas = {}
datas.recipes = [...recipes]
console.log(datas)

datas.allRecipes = [...recipes]
datas.allIngredients = getIngredients(datas)
datas.allAppliances = getAppliiances(datas)
datas.allUstensils = getUstensils(datas)
datas.selectedTags = []

console.log(datas)

let datasProxy = new Proxy(datas, {
  get: (obj, prop) => {
    return obj[prop]
  },

  set: function (target, key, value) {
    target[key] = value

    if (key == 'recipes') {
      const container = document.querySelector('.container')
      container.innerHTML = ''
      datasProxy.ingredients = getIngredients(datasProxy)
      datasProxy.appliances = getAppliiances(datasProxy)
      datasProxy.ustensils = getUstensils(datasProxy)

      target[key].map((recipe) => {
        displayRecipes(recipe)
        return true
      })
    }

    if (key === 'ingredients') {
      const ingredientsDataList = document.querySelector('#ingredientsList')
      ingredientsDataList.innerHTML = ''
      console.log('ingredients', value)
      value.forEach((ingredient) => {
        if (!datas.selectedTags.includes(ingredient)) {
          const option = document.createElement('li')
          option.value = ingredient
          option.classList.add('ingredientsLi')
          option.innerText = ingredient
          ingredientsDataList.style.display = 'block'
          ingredientsDataList.appendChild(option)
        }
      })
      const ingredientsLi = document.querySelectorAll('.ingredientsLi')
      console.log(Array.from(ingredientsLi).length)
      ingredientsLi.forEach((ingredient) => {
        ingredient.addEventListener('click', (e) => {
          const str = ingredient.innerText
          datasProxy.selectedTags.push(str)
          console.log('le bon ' + str)
          handleIngSearch(str, datasProxy, datas)
          createBlueTag(str, datasProxy, datas)
        })
      })
    }

    if (key === 'appliances') {
      const appliancesDataList = document.querySelector('#appliancesList')
      appliancesDataList.innerHTML = ''
      console.log('appliances', value)
      value.forEach((appliance) => {
        if (!datas.selectedTags.includes(appliance)) {
          const option = document.createElement('li')
          option.value = appliance
          option.classList.add('appliancesLi')
          option.innerText = appliance
          appliancesDataList.style.display = 'block'
          appliancesDataList.appendChild(option)
        }
      })

      const appliancesLi = document.querySelectorAll('.appliancesLi')
      console.log(Array.from(appliancesLi).length)
      appliancesLi.forEach((appliance) => {
        appliance.addEventListener('click', (e) => {
          const str = appliance.innerText
          datasProxy.selectedTags.push(str)
          console.log('le bon ' + str)
          handleAppSearch(str, datasProxy, datas)
          createGreenTag(str, datasProxy, datas)
        })
      })
    }

    if (key === 'ustensils') {
      const ustensilDataList = document.querySelector('#ustensilsList')
      ustensilDataList.innerHTML = ''
      console.log('ustensils', value)
      value.forEach((ustensil) => {
        if (!datas.selectedTags.includes(ustensil)) {
          const option = document.createElement('li')
          option.value = ustensil
          option.classList.add('ustensilLi')
          option.innerText = ustensil
          ustensilDataList.style.display = 'block'
          ustensilDataList.appendChild(option)
        }
      })

      const ustensilLi = document.querySelectorAll('.ustensilLi')
      console.log(Array.from(ustensilLi).length)
      ustensilLi.forEach((ustensil) => {
        ustensil.addEventListener('click', (e) => {
          const str = ustensil.innerText
          datasProxy.selectedTags.push(str)
          console.log('le bon ' + str)
          handleUstSearch(str, datasProxy, datas)
          createRedTag(str, datasProxy, datas)
        })
      })
    }

    if (key === 'searchType') {
      filterData(value, datas, datasProxy)
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
    const filter = datas.recipes.filter(
      (elt) =>
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
  } else {
    datasProxy.recipes = [...recipes]
  }
  datasProxy.searchLength = str.length
})

// document.querySelector('#search__input').addEventListener('input', (e) => {
//   const str = e.target.value
//   datasProxy.mainSearch = str
//   if (str.length >= 3 && str.length > datas.searchLength) {
//     // use for loop
//     for (let i = 0; i < datas.recipes.length; i++) {
//       const elt = datas.recipes[i]
//       if (
//         elt.name.toLowerCase().includes(str.toLowerCase()) ||
//         elt.description.toLowerCase().includes(str.toLowerCase()) ||
//  REMPLACER PAR UNE FOR LOOP / some 
//         elt.ingredients.some((ingredient) =>

//           ingredient.ingredient.toLowerCase().includes(str.toLowerCase())
//         ) ||
//         elt.appliance.toLowerCase().includes(str.toLowerCase()) ||
//         elt.ustensils.some((ustensil) =>
//           ustensil.toLowerCase().includes(str.toLowerCase())
//         )
//       ) {
//         datasProxy.recipes.push(elt)
//       }
//     }
//     console.log(datasProxy.recipes)
//   } else {
//     datasProxy.recipes = [...recipes]
//   }
//   datasProxy.searchLength = str.length
// })

searchIngredients(datasProxy, datas, recipes)
searchAppliances(datasProxy, datas, recipes)
searchUstensils(datasProxy, datas, recipes)

const searchIngInput = document.querySelector('#search__input-ingredients')
const searchIngContainer = document.querySelector('.blue')
const bigSearchIngredient = document.querySelector('.filterIngredient')
const ingUl = document.querySelector('#ingredientsList')

const searchAppInput = document.querySelector('#search__input-appliances')
const searchAppContainer = document.querySelector('.green')
const bigSearchAppliance = document.querySelector('.filterAppliances')
const appUl = document.querySelector('#appliancesList')

const searchUstInput = document.querySelector('#search__input-ustensils')
const searchUstContainer = document.querySelector('.red')
const bigSearchUstensil = document.querySelector('.filterUstensils')
const ustUl = document.querySelector('#ustensilsList')

const handleOpenBox = (searchInput, searchContainer, bigSearchBox, ul) => {
  let clicked = false

  searchInput.addEventListener('click', (e) => {
    if (clicked === false) {
      ul.style.display = 'block'
      searchInput.style.width = '100%'
      searchContainer.style.width = '100%'
      searchContainer.style.height = 'auto'
      searchContainer.style.maxHeight = '300px'
      
      bigSearchBox.style.width = 'auto'
      searchInput.style.borderRadius = '5px 5px 0 0'
      // ingUl.style.width = '900px'
      clicked = true
    } else {
      ul.style.display = 'none'
      searchContainer.style.width = '170px'
      searchInput.style.width = '170px'
      searchContainer.style.height = '0'
      bigSearchBox.style.width = '170px'
      searchInput.style.borderRadius = '5px'

      clicked = false
    }
  })
}

handleOpenBox(searchIngInput, searchIngContainer, bigSearchIngredient, ingUl)
handleOpenBox(searchUstInput, searchUstContainer, bigSearchUstensil, ustUl)
handleOpenBox(searchAppInput, searchAppContainer, bigSearchAppliance, appUl)

