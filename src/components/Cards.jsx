import React from 'react';
import PropTypes from 'prop-types';

export default function Cards({ index, recipe = {} }) {
  const {
    strMealThumb = '',
    strDrinkThumb = '',
    strMeal = '',
    strDrink = '',
  } = recipe;

  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <h2
        data-testid={ `${index}-card-name` }
      >
        { strMeal || strDrink }
      </h2>
      <img
        alt=""
        data-testid={ `${index}-card-img` }
        src={ strMealThumb || strDrinkThumb }
      />
    </div>
  );
}

Cards.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
