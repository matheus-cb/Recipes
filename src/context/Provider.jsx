import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  apiMeals, apiDrinks, apiDrinksCategory, apiMealsCategory,
} from '../services/APIdeReceitas';

export default function Provider({ children }) {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);

  const reSearch = (x) => { // funçao ainda pra ser implementanda com a Barra de busca do Header
    setSearch(x);
  };

  const numerodoze = 12; // Numero referente a quantidade de itens que tem que aparecer na tela
  const numerocinco = 5; // Numero referente a quantidade de categorias que queremos da API

  useEffect(() => { // recebe o resultado a API referente, e armazena o Array no estado de Meals
    async function armazenaReceita() {
      const guardaValorMeals = await apiMeals(search, numerodoze);
      // console.log(guardaValorAPi);
      setMeals(guardaValorMeals);
    }
    armazenaReceita();
  }, [search]);

  useEffect(() => { // recebe o resultado a API referente, e armazena o Array no estado de Drinks
    async function armazenaDrink() {
      // console.log(guardaValorAPi);
      const guardaValorDrinks = await apiDrinks(search, numerodoze);
      // console.log(guardaValorDrinks);
      setDrinks(guardaValorDrinks);
    }
    armazenaDrink();
  }, [search]);

  useEffect(() => { // Armazena o resultado das API's no estado de mealsCategory e drinksCategory
    async function filterCategory() {
      const categoryMeals = await apiMealsCategory(numerocinco);
      const categoryDrinks = await apiDrinksCategory(numerocinco);
      // console.log(categoryMeals);
      // console.log(categoryDrinks);
      setMealsCategory(categoryMeals);
      setDrinksCategory(categoryDrinks);
    }
    filterCategory();
  }, []);

  const valuesProvider = useMemo(() => ({ // valores dos estados para serem passados aos filhos do Provider
    search,
    meals,
    drinks,
    mealsCategory,
    drinksCategory,
    reSearch,
  }), [meals, search, drinks, mealsCategory, drinksCategory]);

  return (
    <RecipesContext.Provider
      value={ valuesProvider }
    >
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
