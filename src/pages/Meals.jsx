import React, { useContext } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

export default function Meals() {
  const { meals } = useContext(RecipesContext);
  const numero = 12;

  return (
    <div>
      <Header title="Meals" searchOn />
      <Recipes recipes={ meals.slice(0, numero) } />
    </div>
  );
}
