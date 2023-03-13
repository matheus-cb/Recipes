import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa o componente Profile', () => {
  const EMAIL_INPUT = 'email-input';
  const EMAIL_TEST = 'teste@trybe.com';
  const EMAIL_USER_ID = 'profile-email';
  const BTN_CLEAR = 'profile-logout-btn';

  it('Teste se o e-mail logado está renderizado na tela corretamente', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(email, EMAIL_TEST);
    userEvent.type(password, '1478523');
    userEvent.click(buttonLogin);

    const buttonProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(buttonProfile);

    const emailUser = screen.getByTestId(EMAIL_USER_ID);
    expect(emailUser).toHaveTextContent(EMAIL_TEST);

    expect(emailUser).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(7);

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    expect(doneRecipesBtn).toBeInTheDocument();

    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipesBtn).toBeInTheDocument();

    const clearBtn = screen.getByTestId(BTN_CLEAR);
    userEvent.click(clearBtn);

    const emailInput = screen.getByTestId(EMAIL_INPUT);

    expect(emailInput).toBeInTheDocument();
  });

  it('Testa se a tela fica vazia caso nenhum e-mail seja digitado no login', () => {
    renderWithRouter(<Profile />);

    localStorage.setItem('user', JSON.stringify({
      email: '',
    }));

    const emailUser = screen.getByTestId(EMAIL_USER_ID);
    expect(emailUser).toHaveTextContent('');

    localStorage.removeItem('user');
  });

  it('deve limpar o localStorage após o logout', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(email, EMAIL_TEST);
    userEvent.type(password, '1478523');
    userEvent.click(buttonLogin);

    const buttonProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(buttonProfile);

    const clearBtn = screen.getByTestId(BTN_CLEAR);
    userEvent.click(clearBtn);

    expect(localStorage.getItem('user')).toBeNull();
  });

  it('Testa se o componente renderiza corretamente com um e-mail digitado no login', () => {
    localStorage.setItem('user', JSON.stringify({
      email: EMAIL_TEST,
    }));

    renderWithRouter(<Profile />);

    const emailUser = screen.getByTestId(EMAIL_USER_ID);
    expect(emailUser).toHaveTextContent(EMAIL_TEST);

    const clearBtn = screen.getByTestId(BTN_CLEAR);
    userEvent.click(clearBtn);
    expect(localStorage.getItem('user')).toBeNull();
  });
});
