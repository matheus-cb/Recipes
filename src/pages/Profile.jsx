import React from 'react';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div>
      <Header title="Profile" searchOn={ false } />
      <div
        type="email"
        name="email"
        data-testid="profile-email"
      />
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
