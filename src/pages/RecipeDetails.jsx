import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { apiDrinkPerId, apiMealPerId } from '../services/APIdeReceitas';

export default function RecipeDetails(props) {
  const {
    match: {
      params: { id },
      url,
    },
  } = props;

  const [card, setCard] = useState({});

  useEffect(() => {
    async function getMeal() {
      const meal = await apiMealPerId(id);
      setCard(meal);
    }
    async function getDrink() {
      const drink = await apiDrinkPerId(id);
      setCard(drink);
    }
    if (url.includes('meal')) getMeal();
    if (url.includes('drink')) getDrink();
  }, [id, url]);

  console.log(card);
  return (
    <div>
      ReipeDetails
      { id }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};
