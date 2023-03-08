import React, { useContext } from 'react';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

export default function Meals() {
  const {
    meals, mealsCategory, apiMealsFiltered, allMeals,
  } = useContext(RecipesContext);

  return (
    <div>
      <Header title="Meals" searchOn />
      <Categories
        categories={ mealsCategory }
        func={ apiMealsFiltered }
        funcAll={ allMeals }
      />
      <Recipes receitas={ meals } tipoReceita="meals" />
    </div>
  );
}

// O componente Recipes, recebe um Array Vazio, que e preenchido com o estado Meals, que contem os 12 Drinks para serem rederiza-los
