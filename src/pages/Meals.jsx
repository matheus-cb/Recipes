import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

export default function Meals() {
  const { meals } = useContext(RecipesContext);

  return (
    <div>
      <Header title="Meals" searchOn />
      <Recipes receitas={ meals } />
      <Footer />
    </div>
  );
}

// O componente Recipes, recebe um Array Vazio, que e preenchido com o estado Meals, que contem os 12 Drinks para serem rederiza-los
