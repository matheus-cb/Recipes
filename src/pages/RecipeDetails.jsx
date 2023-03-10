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

  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [instruction, setInstruction] = useState('');

  useEffect(() => {
    async function getMeal() {
      const meal = await apiMealPerId(id);
      setPhoto(meal.meals[0].strMealThumb);
      setTitle(meal.meals[0].strMeal);
      setCategory(meal.meals[0].strCategory);
      setInstruction(meal.meals[0].strInstructions);
    }
    async function getDrink() {
      const drink = await apiDrinkPerId(id);
      setPhoto(drink.drinks[0].strDrinkThumb);
      setTitle(drink.drinks[0].strDrink);
      setCategory(drink.drinks[0].strCategory);
      setInstruction(drink.drinks[0].strInstructions);
    }
    if (url.includes('meal')) getMeal();
    if (url.includes('drink')) getDrink();
  }, [id, url]);

  return (
    <div>
      <h1>{ title }</h1>
      <img
        alt=""
        src={ photo } // Recebe o link da Thumb, do Meals ou do Drink
      />
      <h2>{ category }</h2>
      <p>{ instruction }</p>
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
