import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import './componentsCSS/Footer.css';

export default function Footer() {
  return (
    <footer id="footer" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        src={ DrinkIcon }
      >
        <img src={ DrinkIcon } alt="Ícone de bebida" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        src={ MealIcon }
      >
        <img src={ MealIcon } alt="Ícone de comida" />
      </button>
    </footer>
  );
}
