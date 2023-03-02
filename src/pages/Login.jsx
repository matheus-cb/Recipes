import React, { useState } from 'react';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [buttonValid, setButtonValid] = useState(true);

  function handleChange({ target: { name, value } }) {
    setLogin({
      ...login,
      [name]: value,
    });

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.email);
    const num = 6;
    const minCharacter = login.password.length >= num;

    if (regex === true && minCharacter === true) {
      setButtonValid(false);
    } else {
      setButtonValid(true);
    }
  }

  return (
    <form action="">
      <label htmlFor="">
        <input
          type="email"
          name="email"
          onChange={ handleChange }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="">
        <input
          type="password"
          name="password"
          onChange={ handleChange }
          data-testid="password-input"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        disabled={ buttonValid }
      >
        Enter
      </button>
    </form>
  );
}
