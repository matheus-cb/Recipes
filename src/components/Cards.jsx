import React from 'react';
import PropTypes from 'prop-types';

export default function Cards({ item, receitas = {} }) {
  const {
    strMealThumb = '',
    strDrinkThumb = '',
    strMeal = '',
    strDrink = '',
  } = receitas; // objeto que armazena e faz troca de estados vindo da API, referente ao nome do Prato ou Drink e sua foto

  return (
    <div
      data-testid={ `${item}-recipe-card` } // Recebe o index(item) do Alimento referente
    >
      <h2
        data-testid={ `${item}-card-name` } // Recebe o nome referente ao Meal ou Drink
      >
        { strMeal || strDrink }
      </h2>
      <img
        alt=""
        data-testid={ `${item}-card-img` }
        src={ strMealThumb || strDrinkThumb } // Recebe o link da Thumb, do Meals ou do Drink
      />
    </div>
  );
}

Cards.propTypes = {
  receitas: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
  item: PropTypes.number.isRequired,
};
