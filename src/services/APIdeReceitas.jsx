const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URL_CATEGORY_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const URL_CATEGORY_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const URL_FILTER_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const URL_FILTER_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const apiMeals = async (search, numeroLimite) => { // Faz requisao da API de apenas os pratos de comida!
  const response = await fetch(`${URL_MEALS}${search}`);
  const data = await response.json();
  return data.meals.slice(0, numeroLimite);
};

const apiDrinks = async (search, numeroLimite) => { // Faz requisao de API de apenas dos drinks!
  const response = await fetch(`${URL_DRINKS}${search}`);
  const data = await response.json();
  return data.drinks.slice(0, numeroLimite);
};

const apiMealsCategory = async (numeroLimite) => { // Faz requisao da API das cinco primeiras categorias de comida!
  const response = await fetch(URL_CATEGORY_MEALS);
  const data = await response.json();
  return data.meals.slice(0, numeroLimite);
};

const apiDrinksCategory = async (numeroLimite) => { // Faz requisao da API das cinco primeiras categorias de bebida!
  const response = await fetch(URL_CATEGORY_DRINKS);
  const data = await response.json();
  return data.drinks.slice(0, numeroLimite);
};

const apiMealsFilter = async (category) => { // Faz requisao da API por filtro das categorias de comida!
  const response = await fetch(`${URL_FILTER_MEALS}${category}`);
  const data = await response.json();
  return data.meals;
};

const apiDrinksFilter = async (category) => { // Faz requisao da API por filtro das categorias de bebida!
  const response = await fetch(`${URL_FILTER_DRINKS}${category}`);
  const data = await response.json();
  return data.drinks;
};

export {
  apiMeals,
  apiDrinks,
  apiMealsCategory,
  apiDrinksCategory,
  apiMealsFilter,
  apiDrinksFilter,
};
