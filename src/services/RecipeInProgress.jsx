const isInProgress = (mealOrDrink, id) => {
  const objTeste = {
    meals: {
      52771: [],
    },
    drinks: {
      178319: [],
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(objTeste));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(inProgressRecipes);
  if (inProgressRecipes === null) {
    return false;
  }
  if (mealOrDrink === 'meal' && inProgressRecipes.meals !== undefined) {
    console.log(inProgressRecipes.meals[id]);
    return inProgressRecipes.meals[id] !== undefined;
  } if (mealOrDrink === 'drink' && inProgressRecipes.drinks !== undefined) {
    console.log(inProgressRecipes.drinks);
    return inProgressRecipes.drinks[id] !== undefined;
  }
};

export default isInProgress;
