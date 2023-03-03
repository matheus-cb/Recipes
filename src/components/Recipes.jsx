import React from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';

export default function Recipes({ recipes = [] }) {
  return (
    <div>
      { recipes.map((recipe, index) => (
        <Cards
          key={ recipe.idMeal || recipe.idDrink }
          receita={ recipe }
          item={ index }
        />

      )) }

    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  })).isRequired,
};
