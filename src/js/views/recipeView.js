import { DOM } from "./DOM";

export const clearRecipe = () => {
    DOM.recipe.innerHTML = " ";
};

export const calcRecipes = (recipe, type) => {
    let flagCount = false;
    console.log(flagCount);
    if (type === "minus") {
        if (recipe.serving > 0 && flagCount === false) {
            recipe.serving--;
            recipe.time = recipe.time - 15;
            recipe.ingredients.map((el) => {
                if (el.count > 0) {
                    el.count = el.count - 0.5;
                } else {
                    flagCount = true;
                    el.count;
                }
            });
        }
        console.log(flagCount);
    } else if (type === "plus") {
        recipe.serving++;
        recipe.time = recipe.time + 15;
        recipe.ingredients.map((el) => {
            el.count = el.count + 0.5;
        });
    }
    return recipe;
};
const createIngredient = (ingredients) => `
  <li class="recipe__item">
    <svg class="recipe__icon">
        <use href="src/assets/img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${ingredients.count}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ingredients.unit}</span>
        ${ingredients.ingredient}
    </div>
  </li>
`;

export const renderRecipe = (recipe) => {
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image_url}" alt="${
        recipe.title
    }" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
      </figure>
  
      <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="src/assets/img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
                recipe.time
            }</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="src/assets/img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
                recipe.serving
            }</span>
            <span class="recipe__info-text"> servings</span>
  
            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-minus">
                    <svg>
                        <use href="src/assets/img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-plus">
                    <svg>
                        <use href="src/assets/img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>
        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="src/assets/img/icons.svg#icon-heart-outlined"></use>
            </svg>
        </button>
      </div>
  
      <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map((el) => createIngredient(el)).join(" ")}
        </ul>
  
        <button class="btn-small recipe__btn">
            <svg class="search__icon">
                <use href="src/assets/img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
      </div>
  
      <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="src/assets/img/icons.svg#icon-triangle-right"></use>
            </svg>
  
        </a>
      </div>
    `;
    DOM.recipe.insertAdjacentHTML("afterbegin", markup);
};
