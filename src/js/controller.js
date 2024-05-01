import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from '../js/views/recipeView.js';
import searchView from './views/searchView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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

    // 2. Load Results
    await model.loadSearchResults(query);

    // 3. Render results
    console.log(model.state.search);
  } catch (error) {
    console.log(`${error} 💥💥💥💥`);
  }
};

const init = function () {
  recipeView.addHandlerRender(showRecepie);
  searchView.addHandlerSearch(controlShowResults);
};

init();
