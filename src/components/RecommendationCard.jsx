import React from 'react';
import PropTypes from 'prop-types';

export default function RecommendationCard({ title, thumb, testIdCard, testIdTitle }) {
  return (
    <div data-testid={ testIdCard }>
      <img
        src={ thumb }
        alt="recipe"
        width="200px"
      />
      <p
        data-testid={ testIdTitle }
      >
        { title }
      </p>
    </div>
  );
}
RecommendationCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  testIdCard: PropTypes.string.isRequired,
  testIdTitle: PropTypes.string.isRequired,
};
