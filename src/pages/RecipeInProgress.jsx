import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { apiDrinkPerId, apiMealPerId } from '../services/APIdeReceitas';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

export default function RecipeInProgress(props) {
  const {
    match: {
      params: { id },
      url,
    },
  } = props; // Recenbendo ID e o URL

  const [photo, setPhoto] = useState(''); // Estado Local para as Infos da Page
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [instruction, setInstruction] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState([false]);
  const [linkcopy, setLinkcopy] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const favorite = () => {
    if (favorited === false) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  };

  const { pathname } = useLocation();

  const linkCopied = () => {
    const deleteInProgress = -12;
    setLinkcopy(true);
    navigator.clipboard.writeText(`http://localhost:3000${pathname.slice(0, deleteInProgress)}`);
  };

  const getIngredients = (obj) => { // Monta a lista com os Ingredientes
    const chaves = Object.entries(obj);
    console.log(chaves);
    const allIngredients = chaves.filter((element) => element[0].includes('Ingredient')
      && ((element[1] !== '') && (element[1] !== null)));
    const allMeasures = chaves.filter((element) => element[0].includes('Measure')
      && ((element[1] !== '') && (element[1] !== null)));
    console.log(allIngredients);
    console.log(allMeasures);
    for (let index = 0; index < allIngredients.length; index += 1) {
      allIngredients[index].push(allMeasures[index][1]);
      allIngredients[index].push(index);
    }
    setIngredients(allIngredients);
  };

  useEffect(() => { // Chamadas da API
    async function getMeal() {
      const meal = await apiMealPerId(id);
      const {
        strMealThumb,
        strMeal,
        strCategory,
        strInstructions,
      } = meal.meals[0];
      setPhoto(strMealThumb);
      setTitle(strMeal);
      setCategory(strCategory);
      setInstruction(strInstructions);
      getIngredients(meal.meals[0]);
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
    if (url.includes('meal')) getMeal();
    if (url.includes('drink')) getDrink();
  }, [id, url]);

  function handleCheck(event) {
    const nextChecked = checked; // pegando o valor do estado atual
    nextChecked[event.target.name] = event.target.checked; // criando um array atualizado para o estado
    setChecked(nextChecked); // atualizando o estado de fato
    localStorage.setItem('inProgressRecipes', JSON.stringify(nextChecked)); // salvando o novo estado no localStorage, tornando o estado uma string
  }

  const ingredientsList = ingredients.map((ingredient) => { // Monta a lista de Ingredientes
    const ingNum = ingredient[0];
    const ingName = ingredient[1];
    const ingMeasure = ingredient[2];
    const ingIndex = `${ingredient[3]}-ingredient-step`;
    return (
      <label
        key={ ingNum }
        data-testid={ ingIndex }
      >
        <p>{ ingName }</p>
        <p>{ ingMeasure }</p>
        <input
          name={ ingredient[3] }
          type="checkbox"
          onClick={ handleCheck } // atualiza o estado
          checked={ checked[ingredient[3]] } // estado atualizado em chacked
        />
      </label>
    );
  });

  return (
    <div>
      <div>  ENTRANOD NA PÁGINA AQUIII </div>
      <img
        alt="recipe-img"
        data-testid="recipe-photo"
        src={ photo }
      />
      <h1
        data-testid="recipe-title"
      >
        { title }
      </h1>
      <button
        data-testid="share-btn"
        onClick={ linkCopied }
      >
        Share
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
      <div
        data-testid="recipe-category"
      >
        { category }
      </div>
      <div>
        { ingredientsList }
      </div>
      <div
        data-testid="instructions"
      >
        { instruction }
      </div>
      <button
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};
