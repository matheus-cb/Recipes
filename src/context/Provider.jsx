import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

export default function Provider({ children }) {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [type, setType] = useState('');
  const [apiResponseAll, setapiResponseAll] = useState([]);

  const valuesProvider = useMemo(() => ({ // valores dos estados para serem passados aos filhos do Provider
    search,
    meals,
    drinks,
    setSearch,
    type,
    setType,
    isInputVisible,
    setIsInputVisible,
    apiResponseAll,
    setapiResponseAll,
    setMeals,
    setDrinks,
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
