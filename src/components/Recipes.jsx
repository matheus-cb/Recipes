import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cards from './Cards';

export default function Recipes({ receitas = [] }) { // Armazena o array que esta vindo do estado do Provider, Meals ou Drinks
  useEffect(() => {
    // console.log(receitas);
  }, [receitas]);
  return (
    <div>
      { receitas.map((receita, index) => ( // Realiza um Map do Array que contem 12 itens, seja Meals ou Drinks
        <Cards
          key={ receita.idMeal || receita.idDrink } // Rederiza o Card do Alimento atraves do ID que vem da API
          receitas={ receita } // O alimento em si
          item={ index } // Referente ao index do Alimente
        />

      )) }

    </div>
  );
}

Recipes.propTypes = {
  receitas: PropTypes.arrayOf(PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  })).isRequired,
};
