import React from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header({ title, searchOn }) {
  const iconeDePesquisa = () => (
    <button data-testid="search-top-btn" src={ SearchIcon }>
      <img src={ SearchIcon } alt="imagem de pesquisa" />
    </button>
  );

  return (
    <header id="header_contain">
      {
        searchOn ? iconeDePesquisa() : ''
      }
      <h1 data-testid="page-title">
        { title }
      </h1>
      <button data-testid="profile-top-btn" src={ ProfileIcon }>
        <img src={ ProfileIcon } alt="imagem de perfil" />
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchOn: PropTypes.bool.isRequired,
};
