import React, { useState, useEffect } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';

// const mock = [{
//   alcoholicOrNot: '',
//   category: 'Side',
//   doneDate: '2023-03-12T14:38:55.206Z',
//   id: '53060',
//   image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
//   name: 'Burek',
//   nationality: 'Croatian',
//   tags: ['Streetfood', ' Onthego'],
//   type: 'meal',
// }];
export default function DoneRecipes() {
  const [datesLocal, setDatesLocal] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem('doneRecipes', JSON.stringify(mock));
  // }, []);
  useEffect(() => {
    const dates = JSON.parse(localStorage.getItem('doneRecipes'));
    setDatesLocal(dates);
  }, []);

  const getTypes = (param) => {
    const dates = JSON.parse(localStorage.getItem('doneRecipes'));
    if (param === 'meal') {
      const filterMeal = dates.filter((date) => date.type === 'meal');
      setDatesLocal(filterMeal);
    } else if (param === 'drink') {
      const filterDrink = dates.filter((date) => date.type === 'drink');
      setDatesLocal(filterDrink);
    } else {
      setDatesLocal(dates);
    }
  };

  return (
    <>
      <div>DoneRecipes</div>
      <div name="done-recipe">

        <button
          data-testid="filter-by-meal-btn"
          name="filterMeal"
          onClick={ () => getTypes('meal') }

        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          name="filterDrink"
          onClick={ () => getTypes('drink') }

        >
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          name="filterAll"
          onClick={ () => getTypes('all') }

        >
          All
        </button>

      </div>
      <DoneRecipesCard datesLocal={ datesLocal } />
    </>

  );
}
