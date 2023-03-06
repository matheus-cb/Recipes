import React from 'react';
import PropTypes from 'prop-types';

export default function Categories({ categories = [] }) {
  // console.log(categories);
  return (
    <div>
      {
        categories.map((category, index) => (
          <button
            key={ index }
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
};
