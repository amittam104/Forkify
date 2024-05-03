import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from '../js/views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const showRecepie = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    // 1. Render Spinner
    recipeView.renderSpinner();

    // 2. Load recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    // console.error(error);
  }
};

const controlShowResults = async function () {
  try {
    // 1. Get Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load Results
    await model.loadSearchResults(query);

    // 3. Render results
    // console.log(model.state.search);
    ResultsView.render(model.getSearchResultsPage());

    // 4. Render Pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(`${error} 💥💥💥💥`);
  }
};

const controllerPagination = function (pageTO) {
  // 3. Render results
  // console.log(model.state.search);
  ResultsView.render(model.getSearchResultsPage(pageTO));

  // 4. Render Pagination
  paginationView.render(model.state.search);
};

const controlServings = function (changeServings) {
  // Update servings and ingredients quantity in state
  model.updateServings(changeServings);

  // Update the Recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(showRecepie);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlShowResults);
  paginationView.addHandlerPagination(controllerPagination);
};

init();
