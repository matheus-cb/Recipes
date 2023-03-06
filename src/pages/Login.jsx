import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [buttonValid, setButtonValid] = useState(true); // Estado do botao para desativa-lo e ativa-lo

  const history = useHistory();

  function handleChange({ target: { name, value } }) { // Realiza o controle do Input, fazendo a alteraçao do seu estado
    setLogin({
      ...login,
      [name]: value,
    });
    // Valida o Email utilizando Regex, E se a senha tem mais de 6 caracteres
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login.email);
    const num = 6;
    const minCharacter = login.password.length >= num;

    if (regex === true && minCharacter === true) {
      setButtonValid(false);
    } else {
      setButtonValid(true);
    }
  }

  function saveLocalStorage() { // Salve no local Storage o Email do usuario
    localStorage.setItem('user', JSON.stringify({
      email: login.email,
    }));

    // Redireciona a pessoa usuária para a pagina principal de receitas
    history.push('/meals');
  }

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          id="email"
          name="email"
          onChange={ handleChange }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          id="password"
          name="password"
          onChange={ handleChange }
          data-testid="password-input"
        />
      </label>
      <button
        data-testid="login-submit-btn"
        disabled={ buttonValid }
        onClick={ saveLocalStorage }
      >
        Enter
      </button>
    </form>
  );
}
