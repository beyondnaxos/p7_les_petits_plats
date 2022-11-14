import { getIngredients, getAppliiances, getUstensils } from './dataList.js'


// Craete a blue tag
export function createBlueTag(str, datasProxy, datas) {
  const blueTag = document.createElement('div')
  blueTag.classList.add('filter-container-blue')
  blueTag.classList.add('filterTags')
  const par = document.createElement('p')
  par.innerText = str
  blueTag.appendChild(par)
  const image = new Image()
  image.src = '../assets/icons/cross.png'

  blueTag.appendChild(image)
  document.querySelector('.before-container').appendChild(blueTag)
  blueTag.addEventListener('click', (e) => {
    deleteTag(e, datasProxy, datas)
  })
}


// Craete a green tag
export function createGreenTag(str, datasProxy, datas) {
  const greenTag = document.createElement('div')
  greenTag.classList.add('filter-container-green')
  greenTag.classList.add('filterTags')
  greenTag.innerText = str
  const image = new Image()
  image.src = '../assets/icons/cross.png'
  greenTag.innerHTML += image.outerHTML
  document.querySelector('.before-container').appendChild(greenTag)
  greenTag.addEventListener('click', (e) => {
    deleteTag(e, datasProxy, datas)
  })
}


// Craete a red tag
export function createRedTag(str, datasProxy, datas) {
  const redTag = document.createElement('div')
  redTag.classList.add('filter-container-red')
  redTag.classList.add('filterTags')
  redTag.innerText = str
  const image = new Image()
  image.src = '../assets/icons/cross.png'
  redTag.innerHTML += image.outerHTML
  document.querySelector('.before-container').appendChild(redTag)
  redTag.addEventListener('click', (e) => {
    deleteTag(e, datasProxy, datas)
  })
}


// on click delete the tag
export const deleteTag = (event, datasProxy, datas) => {
  // suppression du tag
  const blueTag = event.currentTarget
  blueTag.remove()

  const index = datasProxy.selectedTags.findIndex(
    (elt) => elt === event.currentTarget.innerText
  )
  datasProxy.selectedTags.splice(index, 1)

  // récupèration des recettes
  const recipes = datasProxy.allRecipes
  console.log('clg de datas.selectedTags', datasProxy.selectedTags)
  console.log('clg de datas.ingredients', datasProxy.ingredients)

  // filtrage des recettes sur les tags restants
  let filteredRecipes = []

  if (datasProxy.selectedTags.length > 0) {
    filteredRecipes = recipes.filter((recipe) => {
      let ingredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      )
      return datasProxy.selectedTags.some((tag) => ingredients.includes(tag))
    })

    if (filteredRecipes.length === 0) {
      filteredRecipes = recipes.filter((recipe) => {
        let ustensils = recipe.ustensils
        return datasProxy.selectedTags.some((tag) => ustensils.includes(tag))
      })
    }

    if (filteredRecipes.length === 0) {
      filteredRecipes = recipes.filter((recipe) => {
        let appliances = recipe.appliance
        return datasProxy.selectedTags.some((tag) => appliances.includes(tag))
      })
    }
  } else {
    filteredRecipes = [...recipes]
  }

  console.log('clg de data ', filteredRecipes.length, datas)

  if (datas.mainSearch) {
    console.log('hello')
    const str = datas.mainSearch
    if (str.length >= 3) {
      const filter = filteredRecipes.filter(
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
      filteredRecipes = [...filter]
    }
  }
  datasProxy.recipes = [...filteredRecipes]
}


//  handle ingredient search
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


//  handle appliance search
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


//  handle ustensil search
export const handleUstSearch = (str, datasProxy, datas) => {
  if (str.length > datas.searchLength) {
    const filter = datas.recipes.filter((elt) =>
      elt.ustensils.some(
        (ustensil) => ustensil.toLowerCase() === str.toLowerCase()
      )
    )
    datasProxy.recipes = [...filter]
    datasProxy.ustensils = getUstensils(datasProxy)
  }
  console.log('c ici ', datas)
}


// handle input ingredient search
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
      datasProxy.searchLength = str.length
      if (str.length < 3) {
        datasProxy.ingredients = getIngredients(datasProxy)
        document.querySelector('#ingredientsList').style.display = 'block'
      }
     
      document.querySelector('#ingredientsList').style.display = 'block'
    })
}


// handle input appliance search
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


// handle input ustensil search
export const searchUstensils = (datasProxy, datas, recipes) => {
  document
    .querySelector('#search__input-ustensils')
    .addEventListener('input', (e) => {
      const str = e.target.value
      const filter = datas.ustensils.filter((elt) =>
        elt.toLowerCase().includes(str.toLowerCase())
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
