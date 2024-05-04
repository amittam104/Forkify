import { API_URL, RES_NO_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPage: RES_NO_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // console.log(res, data);

    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
  } catch (error) {
    // Temp error handling
    throw error;
    // console.error(`${error} 💥💥💥`);
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    // Reset the search results to 1st Page
    state.search.page = 1;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPage;
  const end = page * state.search.resultPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const addBookMark = function (recipe) {
  // Add bookmark to state
  state.bookmarks.push(recipe);

  // Make current recipe as bookmarked
  if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  // Delete Bookmark
  const index = state.bookmarks.indexOf(b => b.id === id);
  state.bookmarks.splice(index, 1);

  // Make current recipe as Not bookmarked
  if (state.recipe.id === id) state.recipe.bookmarked = false;
};
