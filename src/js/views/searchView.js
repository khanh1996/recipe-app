import { DOM } from "./DOM";

export const getValueSearch__field = () => DOM.search__field.value;

export const clearInput = () => {
    DOM.search__field.value = "";
};

const limitRecipeTitle = (title, limit = 30) => {
    /*
    Balsamic Strawberry and Chicken Pizza with Sweet Onions and Smoked Bacon
    acc = 0 / acc + cur.length = 8 
    acc = 8 / acc + cur.length = 8 + 10 = 18
    */
    const newTitle = [];
    if (title.length > limit) {
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(" ")} ...`;
    }
    return title;
};
// add item search
const itemResultsSearchList = (element) => {
    const markup = `
        <li>
            <a class="results__link" href="${element.recipe_id}">
                <figure class="results__fig">
                    <img src="${element.image_url}" alt="${element.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                        element.title
                    )}</h4>
                    <p class="results__author">${element.publisher}</p>
                </div>
            </a>
        </li>
    `;
    DOM.results__list.insertAdjacentHTML("afterbegin", markup);
};
// clear
export const clearSearchList = () => {
    DOM.results__list.innerHTML = " ";
};

const numberPaginationSearch = (page) => {
    const markup = `
        <button class="perPager">
            <span>${page}</span>
        </button>
    `;
    DOM.results__pages.insertAdjacentHTML("afterbegin", markup);
};

export const renderPaginationSearch = (numberOfPages) => {
    const markup = `
        <button class="btn-inline results__btn--prev">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-left"></use>
            </svg>
            <span>Page 1</span>
        </button>

        <button class="btn-inline results__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </button>
    `;
    for (let index = 1; index <= numberOfPages; index++) {
        const markup = `
            <button class="perPager">
                <span>${index}</span>
            </button>
        `;
        DOM.results__pages.insertAdjacentHTML("beforeend", markup);
    }
};

// render list item search
export const renderResultsSearch = (data) => {
    //console.log(data);
    data.forEach((element) => {
        return itemResultsSearchList(element);
    });
    // for (let index = 0; index < 2; index++) {
    //     const element = data[index];
    //     return itemResultsSearchList(element);
    // }
};
