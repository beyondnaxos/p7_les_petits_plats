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

let datas = {}
let datasProxy = new Proxy(datas, {
  set: function (target, key, value) {
    console.log(`${key} set to ${value}`)
    target[key] = value
    console.log(key, typeof target[key])
    if (key == 'recipes') {
      const container = document.querySelector('.container')
      container.innerHTML = ''
      target[key].map((recipe) => {
        console.log(recipe)
        displayRecipes(recipe)
        return true
      })
    }
    return true
  },
})

datasProxy.recipes = [...recipes]
datasProxy.searchLength = 0

document.querySelector('#search__input').addEventListener('input', (e) => {
  const str = e.target.value

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

console.log(datas.recipes)

searchIngredients(datasProxy, datas)
searchAppliance(datasProxy, datas)
searchUstensil(datasProxy, datas)

getIngredients(datasProxy)
getAppliiances(datasProxy)
getUstensils(datasProxy)
