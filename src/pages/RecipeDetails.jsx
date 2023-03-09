import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeDetails(props) {
  const {
    match: { params: { id },
    } } = props;

  return (
    <div>
      ReipeDetails
      { id }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
