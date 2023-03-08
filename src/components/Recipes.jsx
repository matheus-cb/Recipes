import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cards from './Cards';

export default function Recipes({ receitas = [], tipoReceita }) {
  useEffect(() => {
    // console.log(receitas);
  }, [receitas]);

  const getPath = (receita) => {
    if (tipoReceita === 'meals') {
      return `/meals/${(receita.idMeal)}`;
    } if (tipoReceita === 'drinks') {
      return `/drinks/${(receita.idDrink)}`;
    }
  };

  return (
    <div>
      { receitas.map((receita, index) => (
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
