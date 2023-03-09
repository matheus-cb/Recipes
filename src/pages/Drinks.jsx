import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';
import { apiDrinks } from '../services/APIdeReceitas';

export default function Drinks() {
  const { drinks, setDrinks } = useContext(RecipesContext);

  const numerodoze = 12;

  useEffect(() => { // recebe o resultado a API referente, e armazena o Array no estado de Drinks
    async function armazenaDrink() {
      // console.log(guardaValorAPi);
      const guardaValorDrinks = await apiDrinks(numerodoze);
      // console.log(guardaValorDrinks);
      setDrinks(guardaValorDrinks);
    }
    armazenaDrink();
  }, []);
  return (
    <div>
      <Header title="Drinks" searchOn />
      <Recipes receitas={ drinks } />
    </div>
  );
}

// O componente Recipes, recebe um Array Vazio, que e preenchido com o estado Drinks, que contem os 12 Drinks para serem rederiza-los
