import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import './componentsCSS/Footer.css';
// teste
export default function Footer() {
  const history = useHistory();
  return (
    <footer id="footer" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        src={ DrinkIcon }
        onClick={ () => history.push('/drinks') }
      >
        <img src={ DrinkIcon } alt="Ícone de bebida" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        src={ MealIcon }
        onClick={ () => history.push('/meals') }
      >
        <img src={ MealIcon } alt="Ícone de comida" />
      </button>
    </footer>
  );
}
