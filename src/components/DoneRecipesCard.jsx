import PropTypes from 'prop-types';
import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../App.css';

export default function DoneRecipesCard({ datesLocal }) {
  const [alert, setAlert] = useState(false);

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
          <p
            data-testid={ `${index}-horizontal-done-date` }
            name="horizontal-done"
          >
            {element?.doneDate}
          </p>
          {element?.tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}

            </span>

          ))}
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
          { alert && <p>Link copied!</p>}
        </div>
      ))}

    </div>
  );
}

DoneRecipesCard.propTypes = {
  datesLocal: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
