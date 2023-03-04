const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

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

export { apiMeals, apiDrinks };
