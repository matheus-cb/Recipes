import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  const [email, setEmail] = useState('');

  function getLocalStorage() {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    return userLocalStorage.email;
  }

  useEffect(() => {
    const emailUser = getLocalStorage();
    setEmail(emailUser);
  }, []);

  function clearLocalStorage() {
    localStorage.clear();
  }

  return (
    <div>
      <Header title="Profile" searchOn={ false } />
      <div
        type="email"
        name="email"
        data-testid="profile-email"
      >
        { email }
      </div>
      <Link to="/done-recipes">
        <button
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          Logout
        </button>

      </Link>
    </div>
  );
}
