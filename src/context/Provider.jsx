
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  apiMeals,
  apiDrinks,
  apiDrinksCategory,
  apiMealsCategory,
  apiDrinksFilter,
  apiMealsFilter,
} from '../services/APIdeReceitas';

export default function Provider({ children }) {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [type, setType] = useState('');
  const [apiResponseAll, setapiResponseAll] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);

  const numerodoze = 12; // Numero referente a quantidade de itens que tem que aparecer na tela
  const numerocinco = 5; // Numero referente a quantidade de categorias que queremos da API

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

  async function apiMealsFiltered(category) {
    const filterMeals = await apiMealsFilter(category, numerodoze);
    setMeals(filterMeals);
  }

  const allMeals = useCallback(async () => {
    const guardaValorMeals = await apiMeals(search, numerodoze);
    setMeals(guardaValorMeals);
  }, [search, numerodoze]);

  async function apiDrinksFiltered(category) {
    const filterDrinks = await apiDrinksFilter(category, numerodoze);
    setDrinks(filterDrinks);
  }

  const allDrink = useCallback(async () => {
    const guardaValorDrinks = await apiDrinks(search, numerodoze);
    setDrinks(guardaValorDrinks);
  }, [search, numerodoze]);

  const valuesProvider = useMemo(() => ({ // valores dos estados para serem passados aos filhos do Provider
    search,
    meals,
    drinks,
    setMeals,
    setDrinks,
    apiResponseAll,
    setapiResponseAll,
    isInputVisible,
    setIsInputVisible,
    type,
    setType,
    setSearch,
    mealsCategory,
    drinksCategory,
    apiMealsFiltered,
    apiDrinksFiltered,
    allMeals,
    allDrink,
  }), [
    type, 
    isInputVisible,
    meals,
    search,
    drinks,
    mealsCategory,
    drinksCategory,
    allMeals,
    allDrink,
  ]);

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
