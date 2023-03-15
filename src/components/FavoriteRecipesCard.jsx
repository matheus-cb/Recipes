import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link, useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { getFavorites } from '../services/Favorite';
import '../App.css';

export default function FavoriteRecipesCard({ datesLocal }) {
  const [alert, setAlert] = useState(false);
  const [favorited, setFavorited] = useState(true);
  const { pathname } = useLocation();
  const numberOne = -1;
  const mealOrDrink = pathname.split('/')[1].slice(0, numberOne);
  console.log('datesLocal', datesLocal);
  const isFavorite = (savedFavorites) => savedFavorites
    .find((e) => e.id === datesLocal.id); // service

  useEffect(() => {
    const savedFavorites = getFavorites();
    if (isFavorite(savedFavorites)) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, []);

  const favorite = async () => {
    let savedFavorites = getFavorites();
    if (isFavorite(savedFavorites)) {
      setFavorited(false);
      savedFavorites = savedFavorites.filter((e) => e.id !== id);
    } else {
      if (mealOrDrink === 'meal') {
        savedFavorites.push(await getMealsDetails(id, mealOrDrink, category));
      } else if (mealOrDrink === 'drink') {
        savedFavorites.push(await getDrinksDetails(id, mealOrDrink));
      }
      setFavorited(true);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      savedFavorites,
    ));
  };

  return (
    <div name="done-recipecard">
      {datesLocal?.map((element, index) => (
        <div key={ element.id }>
          <Link to={ `/${element.type}s/${element.id}` }>
            <img
              className="sizeImage"
              src={ element?.image }
              alt={ element?.name }
              name="image-horizontal"
              data-testid={ `${index}-horizontal-image` }
            />
            <p
              data-testid={ `${index}-horizontal-name` }
              name="horizontal-name"
            >
              {element?.name}
            </p>
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
            name="recipe"
          >
            {`${element?.nationality} - ${element.type === 'meal'
              ? element?.category : element?.alcoholicOrNot}`}
          </p>
          {/* <p
            data-testid={ `${index}-horizontal-done-date` }
            name="horizontal-done"
          >
            {element?.doneDate}
          </p> */}
          {/* {element?.tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}

            </span>
          ))} */}
          <br />
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => {
              clipboardCopy(`http://localhost:3000/${element.type}s/${element.id}`);
              setAlert(true);
              const timer = 2000;
              setTimeout(() => {
                setAlert(false);
              }, timer);
            } }
          >
            <img
              src={ shareIcon }
              alt="compartilhar"
            />

          </button>

          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeart }
            onClick={ favorite }
          >
            <img
              data-testid="favorite-btn"
              src={
                favorited ? blackHeart : whiteHeart
              }
              alt="Botao favoritar"
            />

          </button>
          { alert && <p>Link copied!</p>}
        </div>
      ))}

    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  datesLocal: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
