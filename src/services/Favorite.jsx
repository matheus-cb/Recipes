import { apiDrinkPerId, apiMealPerId } from './APIdeReceitas';

const getFavorites = () => {
  const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) === null
    ? [] : JSON.parse(localStorage.getItem('favoriteRecipes'));
  // console.log(savedFavorites);
  return savedFavorites;
};

const getMealsDetails = async (id, mealOrDrink, category) => {
  let item = null;
  item = await apiMealPerId(id);
  const {
    idMeal,
    strMeal,
    strMealThumb,
    strArea,
  } = item.meals[0];
  return {
    id: idMeal,
    type: mealOrDrink,
    nationality: strArea,
    category,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
};

const getDrinksDetails = async (id, mealOrDrink) => {
  let item = null;
  item = await apiDrinkPerId(id);
  const {
    idDrink,
    strDrink,
    strDrinkThumb,
    strAlcoholic,
    strCategory,
  } = item.drinks[0];
  return {
    id: idDrink,
    type: mealOrDrink,
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };
};

export { getDrinksDetails, getMealsDetails, getFavorites };
