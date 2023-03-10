import React, { useContext, useEffect } from 'react';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';
import { apiMeals } from '../services/APIdeReceitas';

export default function Meals() {
  const {
    meals, mealsCategory, setMeals, apiMealsFiltered, allMeals,
  } = useContext(RecipesContext);
  const numerodoze = 12;

  useEffect(() => { // recebe o resultado a API referente, e armazena o Array no estado de Meals
    async function armazenaReceita() {
      const guardaValorMeals = await apiMeals(numerodoze);
      setMeals(guardaValorMeals);
    }
    armazenaReceita();
  }, [setMeals]);

  return (
    <div>
      <Header title="Meals" searchOn />
      <Categories
        categories={ mealsCategory }
        func={ apiMealsFiltered }
        funcAll={ allMeals }
      />
      <Recipes receitas={ meals } tipoReceita="meals" />
      <Footer />
    </div>
  );
}

// O componente Recipes, recebe um Array Vazio, que e preenchido com o estado Meals, que contem os 12 Drinks para serem rederiza-los
