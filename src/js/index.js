import Search from './models/Search';
import Recipes from './models/Recipes';
import Cart from './models/Cart';
import { DOM, renderLoader, clearLoader } from './views/DOM';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as cartView from './views/cartView';
import { importAll } from './models/RenderImage';

// codding feature
/**
 * Global State
 * - Search object
 * - Current Recipe Object
 * - Shopping list
 * - Wishlist
 */
const state = {};
/**
 * SEARCH CONTROLLER
 */
const controllerSearch = async() => {
    // 1. Get query value from  input search
    const query = searchView.getValueSearch__field();
    //console.log(query);
    // 2 . check exist query
    if (query) {
        // 2. Get data from api and add to state
        state.search = new Search(query);
        // 4 clear search list
        searchView.clearInput();
        searchView.clearSearchList();
        renderLoader(DOM.results);
        //3. get results return from API to state
        await state.search.getApiSearch();
        //5.Render result to ui
        clearLoader();
        searchView.clearPagination();
        searchView.clearSearchList();
        searchView.renderResultsSearch(state.search.result);
    }
};

/**
 * RECIPE CONTROLLER
 */
const controllerRecipe = async() => {
    // get id
    const recipeId = window.location.hash.replace('#', '');
    console.log(recipeId);
    if (recipeId) {
        // 2. Prepare ui
        recipeView.clearRecipe();
        renderLoader(DOM.recipe);
        // 3. Create new object recipe
        state.recipe = new Recipes(recipeId);
        // 4. Get recipe
        await state.recipe.getApiRecipes();
        state.recipe.calcTime();
        state.recipe.calcServing();
        state.recipe.parseIngredients();
        // 5. Render to view
        clearLoader();
        recipeView.renderRecipe(state.recipe);
    }
    console.log(state.recipe);
};

/**
 * CART CONTROLLER
 */
const cartController = () => {
    console.log(state);
    if (!state.cart) state.cart = new List();
    state.recipe.ingredients.forEach((element) => {
        const item = state.cart.addItem(
            element.count,
            element.unit,
            element.ingredient
        );
        cartView.renderItemCart(item);
    });
};

/**
 * LISTENER EVENTS
 */
const setupListenerEvents = () => {
    DOM.search.addEventListener('submit', (event) => {
        event.preventDefault();
        controllerSearch();
    });
    DOM.results__pages.addEventListener('click', (event) => {
        const btn = event.target.closest('.btn-inline');
        if (btn) {
            const goToPage = parseInt(btn.dataset.page);
            //console.log(goToPage);
            searchView.clearSearchList();
            searchView.clearPagination();
            searchView.renderResultsSearch(state.search.result, goToPage);
        }
    });

    ['load', 'hashchange'].forEach((el) =>
        window.addEventListener(el, controllerRecipe)
    );

    DOM.recipe.addEventListener('click', (event) => {
        const btnMinus = event.target.matches('.btn-minus *');
        const btnPlus = event.target.matches('.btn-plus *');
        const recipeBtnAdd = event.target.matches('.recipe__btn--add *');
        if (btnMinus) {
            if (state.recipe.serving > 1) {
                state.recipe.updateServing('decrease');
                state.recipe.updateTime('decrease');
                recipeView.updateServingIngredient(state.recipe);
            }
        } else if (btnPlus) {
            state.recipe.updateServing('increase');
            state.recipe.updateTime('increase');
            recipeView.updateServingIngredient(state.recipe);
        } else if (recipeBtnAdd) {
            cartController();
        }
    });
};

function init() {
    //console.log(state);
    console.log('App running');
    setupListenerEvents();
    importAll(require.context('../assets/img', false, /\.(png|jpe?g|svg)$/));
}
init();