import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { apiMeals, apiDrinks } from '../services/APIdeReceitas';

export default function Provider({ children }) {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const reSearch = (x) => {
    setSearch(x);
  };

  function armazenaReceita() {
    apiMeals(search)
      .then((response) => setMeals(response));
  }

  useEffect(() => {
    armazenaReceita();
  });

  function armazenaDrink() {
    apiDrinks(search)
      .then((response) => setDrinks(response));
  }

  useEffect(() => {
    armazenaDrink();
  });

  const valuesProvider = useMemo(() => ({
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
