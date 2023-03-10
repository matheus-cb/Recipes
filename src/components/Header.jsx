import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import RecipesContext from '../context/RecipesContext';

export default function Header({ title, searchOn }) {
  const { isInputVisible, setIsInputVisible } = useContext(RecipesContext);
  const history = useHistory();

  const handleClickSearchButton = () => {
    setIsInputVisible(!isInputVisible);
  };

  const iconeDePesquisa = () => (
    <button
      data-testid="search-top-btn"
      src={ SearchIcon }
      onClick={ handleClickSearchButton }
    >
      { isInputVisible ? <img src="https://cdn-icons-png.flaticon.com/512/7159/7159094.png" alt="imagem de um x" width="30" height="30" />
        : <img src={ SearchIcon } alt="imagem de pesquisa" /> }
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

      <button
        data-testid="profile-top-btn"
        src={ ProfileIcon }
        onClick={ () => history.push('/profile') }
      >
        <img src={ ProfileIcon } alt="imagem de perfil" />
      </button>

      <hr />
      <SearchBar />
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchOn: PropTypes.bool.isRequired,
};
