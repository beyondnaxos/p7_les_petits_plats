export const searchIngredients = (datasProxy, datas, recipes) => {
  document
    .querySelector('#search__input-ingredients')
    .addEventListener('input', (e) => {
      const str = e.target.value
      console.log(datas);
      if (str.length >= 3 && str.length > datas.searchLength) {
        const filter = datas.recipes.filter((elt) =>
          elt.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(str.toLowerCase())
          )
        )
        datasProxy.recipes = [...filter]
      } else if (str == '') {
        datasProxy.recipes = [...recipes]
        if(datasProxy.mainSearch){
          const filter = datas.recipes.filter((elt) =>
          elt.name.toLowerCase().includes(datasProxy.mainSearch.toLowerCase())
        )
        datasProxy.recipes = [...filter]
        }
      }
      datasProxy.searchLength = str.length
    })
}

// export const searchAppliance = (datasProxy, datas, recipes) => {
//   document
//     .querySelector('#search__input-appliance')
//     .addEventListener('input', (e) => {
//       const str = e.target.value
//       console.log(datas);
//       if (str.length >= 3 && str.length > datas.searchLength) {
//         const filter = datas.appliances.filter(elt => elt.toLowerCase().includes(str.toLowerCase()));
//         datasProxy.recipes = [...filter]
//       } else if (str == '') {
//         datasProxy.recipes = [...recipes]
//         if(datasProxy.mainSearch){
//           const filter = datas.recipes.filter((elt) =>
//           elt.name.toLowerCase().includes(datasProxy.mainSearch.toLowerCase())
//         )
//         datasProxy.recipes = [...filter]
//         }
//       }
//       datasProxy.searchLength = str.length
//     })
// }

export const searchAppliance = (datasProxy, datas) => {
  document
    .querySelector('#search__input-appliance')
    .addEventListener('input', (e) => {
      const str = e.target.value
      if(str.length > datas.searchLength){
      const filter = datas.appliances.filter(elt => elt.toLowerCase().includes(str.toLowerCase()));
      console.log('fiiiiiiiilter', filter);
      datasProxy.appliances = [...filter]
     
      } else {
        datasProxy.recipes = [...Array.from(new Set(datasProxy.recipes.map(elt => elt.appliance)))]
      }
      datasProxy.searchLength = str.length
    })
}



export const searchUstensil = (datasProxy, datas) => {
  document
    .querySelector('#search__input-ustensils')
    .addEventListener('input', (e) => {
      const str = e.target.value

      if (str.length >= 3 && str.length > datas.searchLength) {
        const filter = datasProxy.recipes.filter((elt) =>
          elt.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(str.toLowerCase())
          )
        )
        datasProxy.recipes = [...filter]
      } else {
        datasProxy.recipes = [...datasProxy.recipes]
      }
      datasProxy.searchLength = str.length
    })
}
