import React from 'react';
import PropTypes from 'prop-types';

export default function Categories({ categories = [], func, funcAll }) {
  // console.log(func);

  return (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ funcAll }
      >
        All
      </button>
      {
        categories.map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => func(category.strCategory) }
          >
            { category.strCategory }
          </button>
        ))
      }
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  func: PropTypes.func.isRequired,
  funcAll: PropTypes.func.isRequired,
};
