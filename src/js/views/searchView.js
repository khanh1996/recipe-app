import { DOM } from "./DOM";

export const getValueSearch__field = () => DOM.search__field.value;

export const clearInput = () => {
    DOM.search__field.value = "";
};
export const clearPagination = () => {
    DOM.results__pages.innerHTML = " ";
};
// clear list
export const clearSearchList = () => {
    DOM.results__list.innerHTML = " ";
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
            <a class="results__link" href="#${element.recipe_id}">
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
// create button pagination
const createButtonPagination = (currentPage, type) => `
    <button class="btn-inline results__btn--${
        type === "prev" ? "prev" : "next"
    }"data-page=${type === "prev" ? currentPage - 1 : currentPage + 1}>
        <span>Page ${type === "prev" ? currentPage - 1 : currentPage + 1}</span>
        <svg class="search__icon">
            <use href="src/assets/img/icons.svg#icon-triangle-${
                type === "prev" ? "left" : "right"
            }"></use>
        </svg>
    </button>
`;

// render button pagination
const renderPagination = (currentPage, totalData, numberPerPage) => {
    const numberOfPages = Math.ceil(totalData / numberPerPage); // số trang
    let button;
    if (currentPage === 1 && numberOfPages > 1) {
        // Only render next button
        button = createButtonPagination(currentPage, "next");
    } else if (currentPage < numberOfPages) {
        // Render both button
        button = `
        ${createButtonPagination(currentPage, "prev")}
        ${createButtonPagination(currentPage, "next")}
      `;
    } else if (currentPage === numberOfPages && numberOfPages > 1) {
        // Only render prev button
        button = createButtonPagination(currentPage, "prev");
    }

    DOM.results__pages.insertAdjacentHTML("afterbegin", button);
};
// render list item search
export const renderResultsSearch = (
    data,
    currentPage = 1, // page hiện tại
    numberPerPage = 10 // số lượng sp trên 1 trang
) => {
    console.log(data);
    const begin = (currentPage - 1) * numberPerPage;
    const end = begin + numberPerPage;

    data.slice(begin, end).forEach((element) => {
        return itemResultsSearchList(element);
    });
    renderPagination(currentPage, data.length, numberPerPage);
    // for (let index = 0; index < 2; index++) {
    //     const element = data[index];
    //     return itemResultsSearchList(element);
    // }
};
