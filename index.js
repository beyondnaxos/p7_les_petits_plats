import "./styles.css";
import recipes from "./recipes.js";
let datas = {};
let datasProxy = new Proxy(datas, {
  set: function (target, key, value) {
    console.log(`${key} set to ${value}`);
    target[key] = value;
    console.log(key, typeof target[key]);
    if (key == "recipes") {
      const container = document.querySelector(".container");
      container.innerHTML = "";
      target[key].map((recipe) => {
        console.log(recipe);
        const elt = `<h1>${recipe.name}</h1>`;
        container.innerHTML += elt;
        return true;
      });
    }
    return true;
  }
});

datasProxy.recipes = [...recipes];
datasProxy.searchLength = 0;
console.log(datas);
document.querySelector("input").addEventListener("input", (e) => {
  const str = e.target.value;

  if (str.length >= 3 && str.length > datas.searchLength) {
    const filter = datas.recipes.filter((elt) =>
      elt.name.toLowerCase().includes(str.toLowerCase())
    );
    datasProxy.recipes = [...filter];
  } else {
    datasProxy.recipes = [...recipes];
  }
  datasProxy.searchLength = str.length;
});
