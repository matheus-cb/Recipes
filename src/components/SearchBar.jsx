import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function SearchBar() {
  const { isInputVisible,
    setSearch,
    setType,
    ApiByRadioButtons,
    type } = useContext(RecipesContext);

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
          checked={ type === 'Ingredient' }
          onChange={ ({ target: { value } }) => setType(value) }
        />
        Name
        <input
          type="radio"
          value="Name"
          checked={ type === 'Name' }
          onChange={ ({ target: { value } }) => setType(value) }
          data-testid="name-search-radio"
        />
        First
        <input
          type="radio"
          value="FirstLetter"
          checked={ type === 'FirstLetter' }
          onChange={ ({ target: { value } }) => setType(value) }
          data-testid="first-letter-search-radio"
        />
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ ApiByRadioButtons }
      >
        Search
      </button>
    </div>
  );
}
