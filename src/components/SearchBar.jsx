import React, { useContext, useEffect, useState, useCallback } from 'react';

import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function SearchBar() {
  const { isInputVisible,
    setSearch,
    setType,
    search,
    setMeals,
    setDrinks,
    type } = useContext(RecipesContext);

  const [changeType, setchangeType] = useState('');

  const location = useLocation().pathname;
  // const history = useHistory();

  const urlIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
  const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const urlFirst = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;

  const urlIngredientDrinks = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
  const urlNameDrinks = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  const urlFirstDrinks = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;

  const apiRadioButtons = useCallback(async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const mealsOrDrinks = data;

    if (changeType === 'FirstLetter' && search.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    }

    return mealsOrDrinks;
  }, [changeType, search]);

  const radioButtonsMeals = useCallback(async (button) => {
    let salvaValorMeals = [];
    switch (button) {
    case 'Ingredient':
      salvaValorMeals = await apiRadioButtons(urlIngredient);
      console.log(salvaValorMeals);
      setMeals(salvaValorMeals.meals);
      break;
    case 'Name':
      salvaValorMeals = await apiRadioButtons(urlName);
      console.log(salvaValorMeals);
      setMeals(salvaValorMeals.meals);
      break;
    case 'FirstLetter':
      salvaValorMeals = await apiRadioButtons(urlFirst);
      console.log(salvaValorMeals);
      setMeals(salvaValorMeals.meals);
      break;
    default:
      console.log('default');
      break;
    }
  }, [urlIngredient, urlName, urlFirst, setMeals, apiRadioButtons]);

  const radioButtonsDrinks = useCallback(async (button) => {
    let salvaValorDrinks = [];
    switch (button) {
    case 'Ingredient':
      salvaValorDrinks = await apiRadioButtons(urlIngredientDrinks);
      setDrinks(salvaValorDrinks.drinks);
      break;
    case 'Name':
      salvaValorDrinks = await apiRadioButtons(urlNameDrinks);
      setDrinks(salvaValorDrinks.drinks);
      break;
    case 'FirstLetter':
      salvaValorDrinks = await apiRadioButtons(urlFirstDrinks);
      setDrinks(salvaValorDrinks.drinks);
      break;
    default:
      console.log('default drinks');
      break;
    }
  }, [urlIngredientDrinks, urlNameDrinks, urlFirstDrinks, setDrinks, apiRadioButtons]);

  useEffect(() => {
    if (location === '/meals') {
      radioButtonsMeals(type);
    } else {
      radioButtonsDrinks(type);
    }
  }, [type, location, radioButtonsMeals, radioButtonsDrinks]);

  return (
    <div>
      <div>
        {
          isInputVisible ? (
            <input
              type="text"
              data-testid="search-input"
              placeholder="Digite sua pesquisa"
              onChange={ ({ target: { value } }) => setSearch(value) }
            />
          ) : ''
        }
        Ingredient
        <input
          type="radio"
          value="Ingredient"
          data-testid="ingredient-search-radio"
          checked={ changeType === 'Ingredient' }
          onChange={ ({ target: { value } }) => setchangeType(value) }
        />
        Name
        <input
          type="radio"
          value="Name"
          checked={ changeType === 'Name' }
          onChange={ ({ target: { value } }) => setchangeType(value) }
          data-testid="name-search-radio"
        />
        First
        <input
          type="radio"
          value="FirstLetter"
          checked={ changeType === 'FirstLetter' }
          onChange={ ({ target: { value } }) => setchangeType(value) }
          data-testid="first-letter-search-radio"
        />
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          if (changeType === 'FirstLetter' && search.length !== 1) {
            global.alert('Your search must have only 1 (one) character');
          } else { setType(changeType); }
        } }
      >
        Search
      </button>
    </div>
  );
}
