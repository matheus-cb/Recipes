import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Categories({ categories = [], func, funcAll }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  // selectedCategory é o estado que controla qual categoria está selecionada no momento

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      // botão clicado pela segunda vez, limpar a seleção
      setSelectedCategory('');
      funcAll();
    } else {
      // botão clicado pela primeira vez, selecionar a categoria
      setSelectedCategory(category);
      func(category);
    }
  };

  return (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ () => funcAll() }
      >
        All
      </button>
      {
        categories.map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleCategoryClick(category.strCategory) }
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
