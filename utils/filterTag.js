const beforeContainer = document.querySelector('.before-container')

const createFilterContainerForIngredients = (filterValue) => {
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('filter-container')
  filterContainer.appendChild(createFilter(filterValue))

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

const showFilters = () => {
  beforeContainer.innerHTML = ''
  const filterValue = inputIngredients.value
  const filterValue2 = inputAppliance.value
  const filterValue3 = inputUstensil.value

  if (filterValue !== '') {
    beforeContainer.appendChild(
      createFilterContainerForIngredients(filterValue)
    )
  }
  if (filterValue2 !== '') {
    beforeContainer.appendChild(
      createFilterContainerForAppliances(filterValue2)
    )
  }
  if (filterValue3 !== '') {
    beforeContainer.appendChild(createFilterContainerForUstensils(filterValue3))
  }
}
