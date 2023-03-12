import React from 'react';
import PropTypes from 'prop-types';
import RecommendationCard from './RecommendationCard';
import '../styles/Recommendations.css';

export default function Recommendations({ recommendations }) {
  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {recommendations.map((recommendation, index) => (
          <div className="carousel-item" key={ index }>
            <RecommendationCard
              title={ recommendation.strMeal || recommendation.strDrink }
              thumb={ recommendation.strMealThumb || recommendation.strDrinkThumb }
              testIdCard={ `${index}-recommendation-card` }
              testIdTitle={ `${index}-recommendation-title` }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
    }),
  ).isRequired,
};
