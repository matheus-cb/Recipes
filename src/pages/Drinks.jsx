import React, { useContext, useEffect } from 'react';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';
import { apiDrinks } from '../services/APIdeReceitas';

export default function Drinks() {
  const {
    drinks, setDrinks, drinksCategory, apiDrinksFiltered, allDrink,
  } = useContext(RecipesContext);
  const numerodoze = 12;

  useEffect(() => { // recebe o resultado a API referente, e armazena o Array no estado de Drinks
    async function armazenaDrink() {
      const guardaValorDrinks = await apiDrinks(numerodoze);
      setDrinks(guardaValorDrinks);
    }
    armazenaDrink();
  }, [setDrinks]);

  return (
    <div>
      <Header title="Drinks" searchOn />
      <Categories
        categories={ drinksCategory }
        func={ apiDrinksFiltered }
        funcAll={ allDrink }
      />
      <Recipes receitas={ drinks } tipoReceita="drinks" />
      <Footer />
    </div>
  );
}

// O componente Recipes, recebe um Array Vazio, que e preenchido com o estado Drinks, que contem os 12 Drinks para serem rederiza-los
