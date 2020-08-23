import Search from "./models/Search";
import { DOM } from "./views/DOM";
import * as searchView from "./views/searchView";

/**
 * Global State
 * - Search object
 * - Current Recipe Object
 * - Shopping list
 * - Wishlist
 */
const state = {};
const controllerSearch = async () => {
    // 1. Get query value from  input search
    const query = searchView.getValueSearch__field();
    //console.log(query);
    // 2 . check exist query
    if (query) {
        // 2. Get data from api and add to state
        state.search = new Search(query);
        //3. get results return from API to state
        await state.search.getApiSearch();
        // 4 clear search list
        searchView.clearInput();
        searchView.clearSearchList();
        //5.Render result to ui
        searchView.renderResultsSearch(state.search.result);
        // 6. calculation pagination
        paginationListSearch();
    }
};

const paginationListSearch = () => {
    var list = state.search.result;
    var pageList = new Array();
    var currentPage = 1;
    var numberPerPage = 10; // số sp trên mỗi trang
    var numberOfPages = 0;
    var numberOfPages = getNumberOfPages(list, numberPerPage); // số trang

    console.log(`numberOfPages: ${numberOfPages}`);

    loadList(currentPage, numberPerPage, list, pageList, numberOfPages);
};

const getNumberOfPages = (list, numberPerPage) => {
    return Math.ceil(list.length / numberPerPage);
};
const nextPage = () => {
    currentPage += 1;
    loadList();
};
const previousPage = () => {
    currentPage -= 1;
    loadList();
};
const loadList = (
    currentPage,
    numberPerPage,
    list,
    pageList,
    numberOfPages
) => {
    var begin = (currentPage - 1) * numberPerPage;
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    console.log(`currentPage: ${currentPage}`);
    console.log(`numberPerPage: ${numberPerPage}`);
    console.log(list);
    console.log(pageList);
    searchView.clearSearchList();
    // render result per page
    searchView.renderResultsSearch(pageList);
    // render pagination to ui
    searchView.renderPaginationSearch(numberOfPages);
};
const setupListenerEvents = () => {
    DOM.search.addEventListener("submit", (event) => {
        event.preventDefault();
        controllerSearch();
    });

    // document
    //     .querySelector(".results__btn--prev")
    //     .addEventListener("click", () => {
    //         paginationListSearch();
    //     });
};
function init() {
    console.log("App running");
    setupListenerEvents();
}

init();
