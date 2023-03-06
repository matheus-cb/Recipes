import React, { useEffect, useState } from 'react';
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
      <button
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
    </div>
  );
}
