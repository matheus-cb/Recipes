import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  apiDrinkPerId, apiMealPerId, apiDrinks, apiMeals,
} from '../services/APIdeReceitas';
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

  // Estado para gurdar o valor de recomendação e é passado como props para o componente Recommendations
  const [recommendations, setRecommendations] = useState([]);

  console.log(favorited);

  const history = useHistory();
  const { pathname } = useLocation();

  const linkCopied = () => {
    setLinkcopy(true);
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
  };

  const startRecipe = () => {
    history.push(`${pathname}/in-progress`);
  };

  const favorite = () => {
    if (favorited === false) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  };


  const getIngredients = (obj) => { // Monta a lista com os Ingredientes
    const chaves = Object.entries(obj);
    console.log(chaves);
    const allIngredients = chaves.filter((element) => element[0].includes('Ingredient')
      && ((element[1] !== '') && (element[1] !== null)));
    const allMeasures = chaves.filter((element) => element[0].includes('Measure'));
    // console.log(allIngredients);
    // console.log(allMeasures);
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
  console.log('RecipeDetails', url);
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
        data-testid="favorite-btn"
        onClick={ favorite }
        src={
          favorited ? blackHeart : whiteHeart
        }
      >
        <img
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
          Start Recipe
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
