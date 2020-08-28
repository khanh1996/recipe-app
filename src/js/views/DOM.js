export const DOM = {
    search__field: document.querySelector(".search__field"),
    search: document.querySelector(".search"),
    results__list: document.querySelector(".results__list"),
    results__pages: document.querySelector(".results__pages"),
    results: document.querySelector(".results"),
    results__link: document.querySelectorAll(".results__link"),
    recipe: document.querySelector(".recipe"),
};

export const elementString = {
    loader: "loader",
};

export const renderLoader = (parent) => {
    const loader = `
      <div class="${elementString.loader}">
        <svg>
          <use href="src/assets/img/icons.svg#icon-cw"></use>
        </svg>
      </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if (loader) loader.parentNode.removeChild(loader);
};
