import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  apiMeals, apiDrinks,
} from '../services/APIdeReceitas';
import RecommendationCard from './RecommendationCard';
// import Carousel from '../styles';
export default function Recommendations({ type }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const numSeis = 6;
    async function fetchRecommendations() {
      const response = type === 'meal'
        ? await apiMeals()
        : await apiDrinks();
      // console.log('fetchRecommendations', response);
      setRecommendations(response.slice(0, numSeis)); // exibe apenas 6 recomendações
    }
    fetchRecommendations();
  }, [type]);

  return (
    <div>
      <h2>Recomendações</h2>
      <div className="carousel">
        {recommendations.map((recommendation, index) => (
          <RecommendationCard
            key={ recommendation.idMeal || recommendation.idDrink }
            title={ recommendation.strMeal || recommendation.strDrink }
            thumb={ recommendation.strMealThumb || recommendation.strDrinkThumb }
            testIdCard={ `${index}-recommendation-card` }
            testIdTitle={ `${index}-recommendation-card` }
            className="carousel_item"
          />
        ))}
      </div>
    </div>
  );
}
Recommendations.propTypes = {
  type: PropTypes.oneOf(['meal', 'drink']).isRequired,
};
