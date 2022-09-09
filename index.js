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
// import {createFilterContainerForIngredients} from './utils/filterTag.js'


let datas = {}


let datasProxy = new Proxy(datas, {
  set: function (target, key, value) {
    target[key] = value
    if (key == 'recipes') {
      const container = document.querySelector('.container')
      container.innerHTML = ''
      datasProxy.appliances = getAppliiances(datasProxy);
      target[key].map((recipe) => {
        console.log(recipe)
        displayRecipes(recipe)
        return true
      });
    }
      if (key === 'appliances') {
        //lister les appliances dans ma liste déroulante
        const appliancesDataList = document.querySelector('#applianceList');
        appliancesDataList.innerHTML = '';
        value.forEach((appliance) => {

          const option = document.createElement('option')
          option.value = appliance;
          
          appliancesDataList.appendChild(option)
        });
      }
      if (key === 'ingredients') {
        const ingredientsDataList = document.querySelector('#ingredientsList');
        ingredientsDataList.innerHTML = '';
        value.forEach((ingredient) => {
          const option = document.createElement('option')
          option.value = ingredient;
          ingredientsDataList.appendChild(option)
        });
      }
      if (key === 'ustensils') {
        const ustensilsDataList = document.querySelector('#ustensilsList');
        ustensilsDataList.innerHTML = '';
        value.forEach((ustensil) => {
          const option = document.createElement('option')
          option.value = ustensil;
          ustensilsDataList.appendChild(option)
        });
      }

    
    return true
  },
})

console.log(datasProxy)
datasProxy.recipes = [...recipes]
datasProxy.searchLength = 0

// let mainSearch = []

document.querySelector('#search__input').addEventListener('input', (e) => {
  const str = e.target.value
  datasProxy.mainSearch = str
  if (str.length >= 3 && str.length > datas.searchLength) {
    const filter = datas.recipes.filter((elt) =>
      elt.name.toLowerCase().includes(str.toLowerCase())
    )
    datasProxy.recipes = [...filter]
    console.log(datasProxy.recipes)
  } else {
    datasProxy.recipes = [...recipes]
  }
  datasProxy.searchLength = str.length
})

searchIngredients(datasProxy, datas, recipes)
console.log(datas.recipes)

searchAppliance(datasProxy, datas)
searchUstensil(datasProxy, datas)

getIngredients(datasProxy)
getAppliiances(datasProxy)
getUstensils(datasProxy)
