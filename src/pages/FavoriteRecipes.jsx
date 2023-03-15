import React, { useEffect, useState } from 'react';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [datesLocal, setDatesLocal] = useState([]);
  // const mock = [
  //   {
  //     alcoholicOrNot: '',
  //     category: 'Side',
  //     id: '52977',
  //     image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //     name: 'Corba',
  //     nationality: 'Turkish',
  //     type: 'meal',
  //   },
  //   {
  //     alcoholicOrNot: '',
  //     category: 'Side',
  //     id: '53060',
  //     image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  //     name: 'Burek',
  //     nationality: 'Croatian',
  //     type: 'meal',
  //   },
  // ];

  useEffect(() => {
    const dates = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setDatesLocal(dates);
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" searchOn={ false } />

      <div>
        <button
          data-testid="filter-by-meal-btn"
          name="filterMeal"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          name="filterDrink"
        >
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          name="filterAll"
        >
          All
        </button>
        <FavoriteRecipesCard datesLocal={ datesLocal } />
      </div>
    </div>
  );
}
