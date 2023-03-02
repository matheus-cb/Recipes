import React from 'react';

export default function Login() {
  return (
    <form action="">
      <label htmlFor="">
        <input
          type="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="">
        <input
          type="password"
          data-testid="password-input"
        />
      </label>
      <button
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}
