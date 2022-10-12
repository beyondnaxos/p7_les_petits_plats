import { getIngredients, getAppliiances, getUstensils } from './dataList.js'

const beforeContainer = document.querySelector('.before-container')

// Permet de créer un tag
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

export function createRedTag(str, datasProxy, datas) {
  const redTag = document.createElement('div')
  redTag.classList.add('filter-container-red')
  redTag.classList.add('filterTags')
  redTag.innerText = str
  document.querySelector('.before-container').appendChild(redTag)
  redTag.addEventListener('click', () => {
    deleteTag(str, datasProxy, datas)
  })
}

export function createGreenTag(str, datasProxy, datas) {
  const greenTag = document.createElement('div')
  greenTag.classList.add('filter-container-green')
  greenTag.classList.add('filterTags')
  greenTag.innerText = str
  document.querySelector('.before-container').appendChild(greenTag)
  greenTag.addEventListener('click', () => {
    deleteTag(str, datasProxy, datas)
  })
}

// Permet de supprimer un tag lorsque l'on clique dessus
export const deleteTag = (str, datasProxy, datas) => {
  // suppression du tag
  const blueTag = document.querySelector('.filter-container-blue')
  blueTag.remove()

  // récupèration des recettes
  const recipes = datasProxy.recipes
  console.log('clg de datas.selectedTags', datasProxy.selectedTags)
  console.log('clg de datas.ingredients', datasProxy.ingredients)

  // filtrage des recettes sur les tags restants
  const filteredRecipes = recipes.filter((recipe) => {
    recipe.ingredients.some((ingredient) => {
      datas.ingredients.includes(ingredient.ingredient)
    })
  })
  console.log('clg de filtered Recipes', filteredRecipes)

  // // observer si il y a une recherche (main ) on filtre sur la recette de main search ( str )

  // // actualisation du datasProxy pour les filteredRepices
  datasProxy.recipes = [...filteredRecipes]
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

export const handleAppSearch = (str, datasProxy, datas) => {
  if (str.length > datas.searchLength) {
    const filter = datas.recipes.filter((elt) =>
      elt.appliance.toLowerCase().includes(str.toLowerCase())
    )

    datasProxy.recipes = [...filter]
    datasProxy.appliances = getAppliiances(datasProxy)
  }

  console.log('c ici ', datas)
}

export const handleUstSearch = (str, datasProxy, datas) => {
  if (str.length > datas.searchLength) {
    const filter = datas.recipes.filter((elt) =>
      elt.ustensils.toLowerCase().includes(str.toLowerCase())
    )

    datasProxy.recipes = [...filter]
    datasProxy.ustensils = getUstensils(datasProxy)
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

export const searchAppliances = (datasProxy, datas, recipes) => {
  document
    .querySelector('#search__input-appliances')
    .addEventListener('input', (e) => {
      const str = e.target.value
      const filter = datas.appliances.filter((elt) =>
        elt.toLowerCase().includes(str.toLowerCase())
      )

      datasProxy.appliances = [...filter]

      // **************************************************
      datasProxy.searchLength = str.length
      if (str.length < 3) {
        datasProxy.appliances = getAppliiances(datasProxy)
        document.querySelector('#appliancesList').style.display = 'block'
      }
      // **************************************************
      document.querySelector('#appliancesList').style.display = 'block'
    })
}

export const searchUstensils = (datasProxy, datas, recipes) => {
  document
    .querySelector('#search__input-ustensils')
    .addEventListener('input', (e) => {
      const str = e.target.value
      const filter = datas.ustensils.filter((ustensil) =>
        ustensil.toLowerCase().includes(str.toLowerCase())
      )

      datasProxy.ustensils = [...filter]

      // **************************************************
      datasProxy.searchLength = str.length
      if (str.length < 3) {
        datasProxy.ustensils = getUstensils(datasProxy)
        document.querySelector('#ustensilsList').style.display = 'block'
      }
      // **************************************************

      document.querySelector('#ustensilsList').style.display = 'block'
    })
}

// Permet d'effectuer une recherche en saisissant quelque chose dans l'input ingredients
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

// Permet d'effectuer une recherche en saisissant quelque chose dans l'input appareil
export const appliancesSearch = (datas) => {
  document
    .querySelector('#search__input-appliance')
    .addEventListener('input', (e) => {
      const searchString = e.target.value
      datasProxy.searchString = e.target.value
      datasProxy.searchType = 'appliance'
      const filter = datas.recipes.filter((elt) =>
        elt.appliance.toLowerCase().includes(searchString.toLowerCase())
      )
      return filter
    })
}

// Permet d'effectuer une recherche en saisissant quelque chose dans l'input ustensiles
export const ustensilsSearch = (datas) => {
  document
    .querySelector('#search__input-ustensil')
    .addEventListener('input', (e) => {
      const searchString = e.target.value
      datasProxy.searchString = e.target.value
      datasProxy.searchType = 'ustensils'
      const filter = datas.recipes.filter((elt) =>
        elt.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(searchString.toLowerCase())
        )
      )
      return filter
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
  }

  filterFunctions[tagFilter]()
}
