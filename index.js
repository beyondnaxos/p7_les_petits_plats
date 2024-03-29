import './css/style.css'
import { recipes } from './data/recipes.js'
import { getIngredients, getAppliiances, getUstensils } from './utils/dataList.js'
import { displayRecipes } from './utils/articleModel.js'
import {searchIngredients, searchAppliances, searchUstensils } from './utils/searchEngine.js'
import {filterData, handleIngSearch, handleAppSearch, handleUstSearch, createBlueTag, createGreenTag, createRedTag } from './utils/searchEngine.js'

let datas = {}

// init datas object
datas.recipes = [...recipes]
datas.allRecipes = [...recipes]
datas.allIngredients = getIngredients(datas)
datas.allAppliances = getAppliiances(datas)
datas.allUstensils = getUstensils(datas)
datas.selectedTags = []

// setup proxy for datas object
let datasProxy = new Proxy(datas, {
  set: function (target, key, value, receiver) {
    target[key] = value

    // if key is recipes, display recipes
    if (key == 'recipes') {
      const container = document.querySelector('.container')
      container.innerHTML = ''
      receiver.ingredients = getIngredients(datasProxy)
      receiver.appliances = getAppliiances(datasProxy)
      receiver.ustensils = getUstensils(datasProxy)

      target[key].map((recipe) => {
        displayRecipes(recipe)
        return true
      })
    }

    // if key is ingredients, display ingredients and handle actions
    if (key === 'ingredients') {
      const ingredientsDataList = document.querySelector('#ingredientsList')
      ingredientsDataList.innerHTML = ''
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
      ingredientsLi.forEach((ingredient) => {
        ingredient.addEventListener('click', (e) => {
          const str = ingredient.innerText
          datasProxy.selectedTags.push(str)
          handleIngSearch(str, datasProxy, datas)
          createBlueTag(str, datasProxy, datas)
        })
      })
    }

    // if key is appliances, display appliances and handle actions
    if (key === 'appliances') {
      const appliancesDataList = document.querySelector('#appliancesList')
      appliancesDataList.innerHTML = ''
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
      appliancesLi.forEach((appliance) => {
        appliance.addEventListener('click', (e) => {
          const str = appliance.innerText
          datasProxy.selectedTags.push(str)
          handleAppSearch(str, datasProxy, datas)
          createGreenTag(str, datasProxy, datas)
        })
      })
    }

    // if key is ustensils, display ustensils and handle actions
    if (key === 'ustensils') {
      const ustensilDataList = document.querySelector('#ustensilsList')
      ustensilDataList.innerHTML = ''
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
      ustensilLi.forEach((ustensil) => {
        ustensil.addEventListener('click', (e) => {
          const str = ustensil.innerText
          datasProxy.selectedTags.push(str)
          handleUstSearch(str, datasProxy, datas)
          createRedTag(str, datasProxy, datas)
        })
      })
    }

    // if key is searchString, filter datas 
    if (key === 'searchType') {
      filterData(value, datas, datasProxy)
    }

    return true
  },
})

// update datas object
datasProxy.recipes = [...recipes]
datasProxy.searchLength = 0


// handle main search ( funcitonnals methods)
document.querySelector('#search__input').addEventListener('input', (e) => {
  let searchRecipes = []
  const str = e.target.value
  datasProxy.mainSearch = str
  searchRecipes =
    str.length < datas.searchLength ? [...datas.allRecipes] : [...datas.recipes]
  if (str.length >= 3) {
    const filter = searchRecipes.filter(
      (elt) =>
        elt.name.toLowerCase().includes(str.toLowerCase()) ||
        elt.description.toLowerCase().includes(str.toLowerCase()) ||
        elt.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(str.toLowerCase())
        )
    )
    if (filter.length > 0) {
      datasProxy.recipes = [...filter]
    } else {
      const container = document.querySelector('.container')
      const par = document.createElement('p')
      par.classList.add('noResult')
      par.innerHTML = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc'
      container.innerHTML = ''
      container.appendChild(par)
    }
  } else {
    datasProxy.recipes = [...datas.allRecipes]
  }
  datasProxy.searchLength = str.length
})

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

const inputContainerBlue = document.querySelector('.input-container-blue')
const inputContainerGreen = document.querySelector('.input-container-green')
const inputContainerRed = document.querySelector('.input-container-red')

const blueArrow = document.querySelector('#blueArrow')
const greenArrow = document.querySelector('#greenArrow')
const redArrow = document.querySelector('#redArrow')

const iconContainer = document.querySelector('.icon-container')

// toggle filter list 
const handleOpenBox = (searchInput, searchContainer, bigSearchBox, ul, inputContainer, arrow, iconContainer) => {
  let clicked = false

  inputContainer.addEventListener('click', () => {
    if (clicked === false) {
      ul.style.display = 'block'
      searchInput.style.width = '100%'
      searchContainer.style.width = '100%'
      searchContainer.style.height = 'auto'
      searchContainer.style.maxHeight = '300px'
      bigSearchBox.style.width = 'auto'
      arrow.style.transform = 'rotate(180deg)'
      clicked = true
    } else {
      ul.style.display = 'none'
      searchContainer.style.width = '170px'
      searchInput.style.width = '150px'
      searchContainer.style.height = '0'
      bigSearchBox.style.width = '180px'
      arrow.style.transform = 'rotate(0deg)'
      clicked = false
    }
  })
}

const advancedSearchContainer = document.querySelector(".filter");

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const contentRect = entry.contentRect;
    const totalMargin = contentRect.height;
    entry.target.style.marginBottom = `-${totalMargin}px`;
  });
});

resizeObserver.observe(advancedSearchContainer);

handleOpenBox(searchIngInput, searchIngContainer, bigSearchIngredient, ingUl, inputContainerBlue, blueArrow, iconContainer)
handleOpenBox(searchUstInput, searchUstContainer, bigSearchUstensil, ustUl, inputContainerRed , redArrow , iconContainer)
handleOpenBox(searchAppInput, searchAppContainer, bigSearchAppliance, appUl, inputContainerGreen,   greenArrow , iconContainer)
