import React, { useContext } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { drinks } = useContext(RecipesContext);
  console.log(drinks);
  return (
    <div>
      <Header title="Drinks" searchOn />
      <Recipes receitas={ drinks } />
    </div>
  );
}

// O componente Recipes, recebe um Array Vazio, que e preenchido com o estado Drinks, que contem os 12 Drinks para serem rederiza-los
