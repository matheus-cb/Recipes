import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import '../styles/RecipeDetails.css';
import { getDrinksDetails, getMealsDetails, getFavorites } from '../services/Favorite';
import isInProgress from '../services/API_RecipeInProgress';
import { apiDrinkPerId, apiMealPerId, apiDrinks, apiMeals }
  from '../services/APIdeReceitas';
import Recommendations from '../components/Recommendations';

export default function RecipeDetails(props) {
  const {
    match: {
      params: { id },
      url,
    },
  } = props; // Recenbendo ID e o URL

  const [linkcopy, setLinkcopy] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [photo, setPhoto] = useState(''); // Estado Local para as Infos da Page
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [instruction, setInstruction] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [linkYT, setLink] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);

  const history = useHistory();
  const { pathname } = useLocation();
  const numberOne = -1;
  const mealOrDrink = pathname.split('/')[1].slice(0, numberOne);
  // console.log('mealOrDrink', mealOrDrink);

  const linkCopied = () => {
    setLinkcopy(true);
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
  };

  const startRecipe = () => {
    history.push(`${pathname}/in-progress`);
  };
  const isFavorite = (savedFavorites) => savedFavorites.find((e) => e.id === id); // service

  useEffect(() => {
    if (isInProgress(mealOrDrink, id)) {
      // console.log(isInProgress(mealOrDrink, id));
      setInProgressRecipe(true);
    }
    // console.log(isInProgress());
  }, []);

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

  const getIngredients = (obj) => { // Monta a lista com os Ingredientes
    const chaves = Object.entries(obj);
    // console.log(chaves);
    const allIngredients = chaves.filter((element) => element[0].includes('Ingredient')
      && ((element[1] !== '') && (element[1] !== null)));
    const allMeasures = chaves.filter((element) => element[0].includes('Measure'));
    for (let index = 0; index < allIngredients.length; index += 1) {
      allIngredients[index].push(allMeasures[index][1]);
      allIngredients[index].push(index);
    }
    setIngredients(allIngredients);
  };
  const getLink = (link) => { // Pega o Index do Youtube
    const end = link.split('=');
    setLink(end[1]);
  };
  // Números para utilizar nas funções que precisam de num
  const numeroDoze = 12;
  const numSeis = 6;
  useEffect(() => { // Chamadas da API
    async function getMeal() {
      const meal = await apiMealPerId(id);
      const {
        strMealThumb,
        strMeal,
        strCategory,
        strInstructions,
        strYoutube,
      } = meal.meals[0];
      setPhoto(strMealThumb);
      setTitle(strMeal);
      setCategory(strCategory);
      setInstruction(strInstructions);
      getIngredients(meal.meals[0]);
      getLink(strYoutube);
    }
    async function getDrink() {
      const drink = await apiDrinkPerId(id);
      console.log(drink);
      const {
        strDrinkThumb,
        strDrink,
        strAlcoholic,
        strInstructions,
      } = drink.drinks[0];
      setPhoto(strDrinkThumb);
      setTitle(strDrink);
      setCategory(strAlcoholic);
      setInstruction(strInstructions);
      getIngredients(drink.drinks[0]);
    }
    async function recommendationsMeals() { // cahama a API do meals, para ultilizar como recomendação
      const recomendationMeals = await apiMeals(numeroDoze);
      setRecommendations(recomendationMeals.slice(0, numSeis));
    }
    async function recommendationsDrinks() { // cahama a API do meals, para ultilizar como recomendação
      const recomendationDrinks = await apiDrinks(numeroDoze);
      setRecommendations(recomendationDrinks.slice(0, numSeis));
    }

    if (url.includes('meal')) {
      getMeal();
      recommendationsDrinks();
    }

    if (url.includes('drink')) {
      getDrink();
      recommendationsMeals();
    }
  }, [id, url]);
  // console.log('RecipeDetails', url);
  // console.log('RecipeDetails', id);
  // console.log('RecipeDetails', recommendations);

  const ingredientsList = ingredients.map((ingredient) => { // Monta a lista de Ingredientes
    const ingNum = ingredient[0];
    const ingName = ingredient[1];
    const ingMeasure = ingredient[2];
    const ingIndex = `${ingredient[3]}-ingredient-name-and-measure`;
    return (
      <li
        key={ ingNum }
        data-testid={ ingIndex }
      >
        <p>{ ingName }</p>
        <p>{ ingMeasure }</p>
      </li>
    );
  });

  const embedYoutube = 'https://www.youtube.com/embed/'.concat(linkYT);

  return (
    <div>
      <h1
        data-testid="recipe-title"
      >
        { title }
      </h1>
      <img
        alt=""
        data-testid="recipe-photo"
        src={ photo } // Recebe o link da Thumb, do Meals ou do Drink
      />
      <h2
        data-testid="recipe-category"
      >
        { category }
      </h2>

      <button
        data-testid="share-btn"
        onClick={ linkCopied }
      >
        Compartilhar
      </button>
      { linkcopy === true ? <p>Link copied!</p> : ''}
      <button
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
      <p
        data-testid="instructions"
      >
        { instruction }
      </p>
      <ul>
        { ingredientsList }
      </ul>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ embedYoutube }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
        picture-in-picture; web-share"
      />
      <Recommendations recommendations={ recommendations } />
      <div>
        <button
          data-testid="start-recipe-btn"
          className="buttonRecipe"
          onClick={ startRecipe }
        >
          { inProgressRecipe ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </div>
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
