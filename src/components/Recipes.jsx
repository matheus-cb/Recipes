import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import Cards from './Cards';

export default function Recipes({ receitas = [] }) { // Armazena o array que esta vindo do estado do Provider, Meals ou Drinks
  const location = useLocation().pathname;
  const history = useHistory();

  const numerodoze = 12;

  const [resultReceitas, setResultReceitas] = useState([]);

  useEffect(() => {
    if (!receitas) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (receitas.length === 1) {
      const url = `${location}/${receitas[0].idMeal || receitas[0].idDrink}`;
      history.push(url);
    } else {
      setResultReceitas(receitas.slice(0, numerodoze));
    }
  }, [receitas]);
  return (
    <div>
      {
        resultReceitas.map((receita, index) => ( // Realiza um Map do Array que contem 12 itens, seja Meals ou Drinks
          <Cards
            key={ receita.idMeal || receita.idDrink } // Rederiza o Card do Alimento atraves do ID que vem da API
            receitas={ receita } // O alimento em si
            item={ index } // Referente ao index do Alimente
          />

        ))
      }

    </div>
  );
}

Recipes.propTypes = {
  receitas: PropTypes.arrayOf(PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  })).isRequired,
};
