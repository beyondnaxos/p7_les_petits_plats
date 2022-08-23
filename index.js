import {recipes} from './data/recipes.js';

console.log(recipes);



const loop = [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10];

loop.forEach(element => {
 const recipe = document.createElement('article');
 recipe.classList.add('recipe');
    // handle Image Prototype
const img = new Image()
img.src = './assets/recipes_photos/limonade_coco.jpg'
recipe.appendChild(img);
img.classList.add('recipe__image');

// handle  texts Container Prototype
const textsContainer = document.createElement('div');
textsContainer.classList.add('recipe__texts');
recipe.appendChild(textsContainer);


// handle  title and Ingredients + time and Instructions Container Prototype
const titleIngredientsContainer = document.createElement('div');
const timeAndInstructionsContainer = document.createElement('div');
titleIngredientsContainer.classList.add('recipe__title-ingredients');
timeAndInstructionsContainer.classList.add('recipe__time-instructions');

textsContainer.appendChild(titleIngredientsContainer);
textsContainer.appendChild(timeAndInstructionsContainer);


// handle  title Prototype
const title = document.createElement('h2');
title.classList.add('recipe__title');
title.textContent = 'Limonade coco';

titleIngredientsContainer.appendChild(title);

// handle  ingredients Prototype
const ingredients = document.createElement('ul');
ingredients.classList.add('recipe__ingredients');

const ingredientsList = [
    '1 litre de limonade',
    '1 litre de sucre',
    '1 litre de eau',
    '1 litre de coco',
    '1 litre de sucre'
];

for (let i = 0; i < ingredientsList.length; i++) {
    const ingredient = document.createElement('li');
    ingredient.classList.add('recipe__ingredient');
    ingredient.textContent = ingredientsList[i];
    ingredients.appendChild(ingredient);
}

titleIngredientsContainer.appendChild(ingredients);

//  handle  time Prototype

const time = document.createElement('div');
time.classList.add('recipe__time');
time.innerHTML = "<img class='time__image' src='./assets/icons/clockIcon.png'></img>" + "<p class='time-duration'>30 min</p>";
timeAndInstructionsContainer.appendChild(time);

//  handle  instructions Prototype
const instructions = document.createElement('div');
instructions.classList.add('recipe__instructions');

const instructionContent =" Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quam ipsum ut ex ab eius aspernatur ratione. Quod, quo quibusdam!"

    const instruction = document.createElement('p');
    instruction.classList.add('recipe__instruction');
    instruction.textContent = instructionContent;
    instructions.appendChild(instruction);


timeAndInstructionsContainer.appendChild(instructions);

document.querySelector('#recipes').appendChild(recipe);


});

