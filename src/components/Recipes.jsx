import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory, Link } from 'react-router-dom';
import Cards from './Cards';
import RecipesContext from '../context/RecipesContext';

export default function Recipes({ receitas = [], tipoReceita }) {
  const location = useLocation().pathname;
  const history = useHistory();

  const numerodoze = 12;

  const { resultReceitas, setResultReceitas } = useContext(RecipesContext);

  useEffect(() => {
    if (!receitas || receitas.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (receitas.length === 1) {
      const url = `${location}/${receitas[0].idMeal || receitas[0].idDrink}`;
      history.push(url);
    } else {
      setResultReceitas(receitas.slice(0, numerodoze));
    }
  }, [receitas, setResultReceitas, history, location]);

  const getPath = (receita) => {
    if (tipoReceita === 'meals') {
      return `/meals/${(receita.idMeal)}`;
    } if (tipoReceita === 'drinks') {
      return `/drinks/${(receita.idDrink)}`;
    }
    return '/';
  };

  return (
    <div>
      { resultReceitas.map((receita, index) => (
        <Link to={ getPath(receita) } key={ receita.idMeal || receita.idDrink }>
          <Cards
            key={ receita.idMeal || receita.idDrink }
            receitas={ receita }
            item={ index }
          />
        </Link>
      )) }

    </div>
  );
}

Recipes.propTypes = {
  receitas: PropTypes.arrayOf(PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  })).isRequired,
  tipoReceita: PropTypes.string.isRequired,
};
