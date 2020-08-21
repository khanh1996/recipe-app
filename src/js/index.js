import Search from "./models/Search";
import { DOM } from "./views/DOM";

/**
 * Global State
 * - Search object
 * - Current Recipe Object
 * - Shopping list
 * - Wishlist
 */

const controllerSearch = () => {
    // 1. Get query value from  input search
    const query = DOM.search__field;
    console.log(query);

    // const search = new Search();
    // search.getApiSearch();

    // console.log(search);
};

function init() {
    console.log("App running");
    controllerSearch();
}

init();
