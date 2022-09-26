
import {
  getIngredients,
  getAppliiances,
  getUstensils,
} from './dataList.js'

const beforeContainer = document.querySelector('.before-container')

function createBlueTag (str) {
  const blueTag = document.createElement('div')
  blueTag.classList.add('filter-container-blue')
  blueTag.innerText = str
  document.querySelector('.before-container').appendChild(blueTag)
} 


const handleIngSearch = (str, datasProxy, datas, recipes) => {
  console.log(datas)
  if (str.length >= 3 && str.length > datas.searchLength) {
    const filter = datas.recipes.filter((elt) =>
      elt.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(str.toLowerCase())
      )
    )
    datasProxy.ingredientTag = [str.toLowerCase()]
    console.log(datasProxy.ingredientTag)
    datasProxy.recipes = [...filter]
    datasProxy.ingredients = getIngredients(datasProxy)

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
}

export const searchIngredients = (datasProxy, datas, recipes) => {
  document
    .querySelector('#search__input-ingredients')
    .addEventListener('input', (e) => {
      const str = e.target.value
      handleIngSearch(str, datasProxy, datas, recipes)
    })

  const ingredientsLi = document.querySelectorAll('.ingredientsLi')
  ingredientsLi.forEach((ingredient) => {
    ingredient.addEventListener('click', (e) => {
      const str = ingredient.innerText
      handleIngSearch(str, datasProxy, datas, recipes)
      createBlueTag(e.target.innerText)
      
    })
  }
  )
}

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

export const ingredientsSearch = (datas) => {
  document
    .querySelector('#search__input-ingredients')
    .addEventListener('input', (e) => {
      const searchString = e.target.value
      datasProxy.searchString = e.target.value
      datasProxy.searchType = 'ingredients'
      const filter = datas.recipes.filter((elt) =>
        elt.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchString.toLowerCase())
        )
      )
      return filter
    })
}

export const applianceSearch = () => {
  document
    .querySelector('#search__input-appliance')
    .addEventListener('input', (e) => {
      const searchString = e.target.value
      datasProxy.searchString = e.target.value
      datasProxy.searchType = 'appliance'
    })
}

export const ustensilSearch = () => {
  document
    .querySelector('#search__input-ustensils')
    .addEventListener('input', (e) => {
      const searchString = e.target.value
      datasProxy.searchString = e.target.value
      datasProxy.searchType = 'ustensils'
    })
}

export function filterData(tagFilter, datas, datasProxy) {
  switch (tagFilter) {
    case 'ingredients':
      const filtredIngredients = datas.allIngredients.filter((elt) =>
        elt.toLowerCase().includes(datas.searchString.toLowerCase())
      )
      datasProxy.ingredients = [...filtredIngredients]
      console.log(datasProxy.ingredients)
      break
    case 'appliance':
      const filtredAppliances = datas.allAppliances.filter((elt) =>
        elt.toLowerCase().includes(datas.searchString.toLowerCase())
      )
      datasProxy.appliances = [...filtredAppliances]
      break
    case 'ustensils':
      const filtredUstensils = datas.allUstensils.filter((elt) =>
        elt.toLowerCase().includes(datas.searchString.toLowerCase())
      )
      datasProxy.ustensils = [...filtredUstensils]
      break
    default:
  }
}


