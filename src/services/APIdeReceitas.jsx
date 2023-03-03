const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const apiMeals = async (search, numero) => {
  const response = await fetch(`${URL_MEALS}${search}`);
  const data = await response.json();
  console.log(data);
  return data.meals.slice(0, numero);
};

const apiDrinks = async (search) => {
  const response = await fetch(`${URL_DRINKS}${search}`);
  const data = await response.json();
  return data.drinks;
};

export { apiMeals, apiDrinks };
