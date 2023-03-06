import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { apiMeals, apiDrinks } from '../services/APIdeReceitas';

export default function Provider({ children }) {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const reSearch = (x) => { // funçao ainda pra ser implementanda com a Barra de busca do Header
    setSearch(x);
  };

  const numerodoze = 12; // Numero referente a quantidade de itens que tem que aparecer na tela

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
    reSearch,
  }), [meals, search, drinks]);

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
