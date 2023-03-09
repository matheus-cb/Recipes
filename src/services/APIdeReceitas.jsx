const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const apiMeals = async (numeroLimite) => { // Faz requisao da API de apenas os pratos de comida!
  const response = await fetch(`${URL_MEALS}`);
  const data = await response.json();
  // console.log(data);
  return data.meals.slice(0, numeroLimite);
};

const apiDrinks = async (numeroLimite) => { // Faz requisao de API de apenas dos drinks!
  const response = await fetch(`${URL_DRINKS}`);
  const data = await response.json();
  // console.log(data);
  return data.drinks.slice(0, numeroLimite);
};

export { apiMeals, apiDrinks };
