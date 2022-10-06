import { getIngredients, getAppliiances, getUstensils } from './dataList.js'

const beforeContainer = document.querySelector('.before-container')

export function createBlueTag(str, datasProxy, datas) {
  const blueTag = document.createElement('div')
  blueTag.classList.add('filter-container-blue')
  blueTag.classList.add('filterTags')
  blueTag.innerText = str
  document.querySelector('.before-container').appendChild(blueTag)
  blueTag.addEventListener('click', () => {
    deleteTag(str, datasProxy, datas)  
  })
}

export const deleteTag = ( str, datasProxy , datas) => {
  console.log('hello ' , str)
  // suppression du tag
  const blueTag = document.querySelector('.filter-container-blue')
  blueTag.remove()

  // récupèration des recettes
  const recipes = datas.recipes
  console.log(recipes)
  // filtrage des recettes sur les tags restants
  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.ingredients.some((ingredient) => {
      return datasProxy.selectedTags.includes(ingredient.ingredient)
    })
  })
  console.log(filteredRecipes)

  // observer si il y a une recherche (main ) on filtre sur la recette de main search
  if (datasProxy.searchType === 'main') {
    const mainSearch = datasProxy.mainSearch
    const filteredRecipes = filteredRecipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(mainSearch.toLowerCase())
    })
  }

  // actualisation du datasProxy pour les filteredRepices
  // datasProxy.recipes = filteredRecipes
  // datasProxy.appliances = getAppliiances(datasProxy)
  // datasProxy.ingredients = getIngredients(datasProxy)
  // datasProxy.ustensils = getUstensils(datasProxy)
  // console.log(datasProxy.ustensils)


}

export const handleIngSearch = (str, datasProxy, datas) => {
  if (str.length > datas.searchLength) {
    const filter = datas.recipes.filter((elt) =>
      elt.ingredients.some(
        (ingredient) =>
          ingredient.ingredient.toLowerCase() === str.toLowerCase()
      )
    )

    console.log(datasProxy.ingredientTag)
    datasProxy.recipes = [...filter]
    datasProxy.ingredients = getIngredients(datasProxy)
  } 



  console.log('c ici ', datas)
}

export const searchIngredients = (datasProxy, datas, recipes) => {
  document
    .querySelector('#search__input-ingredients')
    .addEventListener('input', (e) => {
      const str = e.target.value
      const filter = datas.ingredients.filter((ing) =>
        ing.toLowerCase().includes(str.toLowerCase())
      )
      console.log('filter', filter)
      
      datasProxy.ingredients = [...filter]
      
    
    // **************************************************
    datasProxy.searchLength = str.length
    if (str.length < 3) {
      datasProxy.ingredients = getIngredients(datasProxy)
      document.querySelector('#ingredientsList').style.display = 'block'
    }
    // **************************************************
    document.querySelector('#ingredientsList').style.display = 'block'
    })
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
          ingredient.ingredient
            .toLowerCase()
            .includes(searchString.toLowerCase())
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
  const filterFunctions = {
    ingredients: () => {
      const filtredIngredients = datas.allIngredients.filter((elt) =>
        elt.toLowerCase().includes(datas.searchString.toLowerCase())
      )
      datasProxy.ingredients = [...filtredIngredients]
      console.log(datasProxy.ingredients)
    },
    appliance: () => {
      const filtredAppliances = datas.allAppliances.filter((elt) =>
        elt.toLowerCase().includes(datas.searchString.toLowerCase())
      )
      datasProxy.appliances = [...filtredAppliances]
    },
    ustensils: () => {
      const filtredUstensils = datas.allUstensils.filter((elt) =>
        elt.toLowerCase().includes(datas.searchString.toLowerCase())
      )
      datasProxy.ustensils = [...filtredUstensils]
    },
    main: () => {
      const filtredRecipes = datas.recipes.filter((elt) =>
        elt.name.toLowerCase().includes(datas.searchString.toLowerCase())
      )
      datasProxy.recipes = [...filtredRecipes]
    }
  }

  filterFunctions[tagFilter]()
}