import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';
import { apiMeals } from '../services/APIdeReceitas';

export default function Meals() {
  const { meals, setMeals } = useContext(RecipesContext);

  const numerodoze = 12;

  useEffect(() => { // recebe o resultado a API referente, e armazena o Array no estado de Meals
    async function armazenaReceita() {
      const guardaValorMeals = await apiMeals(numerodoze);
      // console.log(guardaValorAPi);
      setMeals(guardaValorMeals);
    }
    armazenaReceita();
  }, []);

  return (
    <div>
      <Header title="Meals" searchOn />
      <Recipes receitas={ meals } />
    </div>
  );
}

// O componente Recipes, recebe um Array Vazio, que e preenchido com o estado Meals, que contem os 12 Drinks para serem rederiza-los
