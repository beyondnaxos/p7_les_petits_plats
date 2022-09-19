const beforeContainer = document.querySelector('.before-container')

export const buildIngredientTag = (filterValue) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('filter-container')
  filterContainer.appendChild(createFilter(filterValue))
  beforeContainer.appendChild(filterContainer)
  return filterContainer
}



const createFilterContainerForAppliances = (filterValue) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('filter-container')
  filterContainer.appendChild(createFilter(filterValue))

  return filterContainer
}

const createFilterContainerForUstensils = (filterValue) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('filter-container')
  filterContainer.appendChild(createFilter(filterValue))

  return filterContainer
}

const createFilter = ( filterValue) => {
  const filter = document.createElement('div')
  filter.classList.add('filter-button-stamp')
  filter.innerHTML = ` <p>${filterValue}</p>`
  return filter
}

// const showFilters = () => {
//   beforeContainer.innerHTML = ''
//   const filterValue = inputIngredients.value
//   const filterValue2 = inputAppliance.value
//   const filterValue3 = inputUstensil.value

//   if (filterValue !== '') {
//     beforeContainer.appendChild(
//       createFilterContainerForIngredients(filterValue)
//     )
//   }
//   if (filterValue2 !== '') {
//     beforeContainer.appendChild(
//       createFilterContainerForAppliances(filterValue2)
//     )
//   }
//   if (filterValue3 !== '') {
//     beforeContainer.appendChild(createFilterContainerForUstensils(filterValue3))
//   }
// }
