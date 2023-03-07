import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { apiMeals, apiDrinks } from '../services/APIdeReceitas';

export default function Provider({ children }) {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [type, setType] = useState('');

  const numerodoze = 12; // Numero referente a quantidade de itens que tem que aparecer na tela

  const ApiByRadioButtons = () => {
    console.log(type);
    if (type === 'FirstLetter' && (search.length > 1 || search.length === 0)) {
      global.alert('Your search must have only 1 (one) character');
    }

    const urlIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    const urlFirst = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;

    const apiPreviewRadio = async (url, state, num) => {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      state(data.meals.slice(0, num));
    };

    switch (type) {
    case 'Ingredient':
      apiPreviewRadio(urlIngredient, setMeals, numerodoze);
      break;
    case 'Name':
      apiPreviewRadio(urlName, setMeals, numerodoze);
      break;
    default:
      apiPreviewRadio(urlFirst, setMeals, numerodoze);
      break;
    }
  };

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

  const valuesProvider = useMemo(() => ({ // valores dos estados para serem passados aos filhos do Provider
    search,
    meals,
    drinks,
    setSearch,
    type,
    setType,
    isInputVisible,
    setIsInputVisible,
    ApiByRadioButtons,
  }), [search, meals, drinks, type, isInputVisible]);

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
