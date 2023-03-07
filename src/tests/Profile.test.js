import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa o componente Profile', () => {
  it('Teste se o e-mail logado está renderizado na tela', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'teste@trybe.com');
    userEvent.type(password, '1478523');
    userEvent.click(buttonLogin);

    const buttonProfile = screen.getByTestId('profile-top-btn');

    userEvent.click(buttonProfile);

    const emailUser = screen.getByTestId('profile-email');
    expect(emailUser).toHaveTextContent('teste@trybe.com');

    expect(emailUser).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);

    const clearBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(clearBtn);

    const emailInput = screen.getByTestId('email-input');

    expect(emailInput).toBeInTheDocument();
  });

  it('Testa se não for digitado nenhum e-mail em login', () => {
    renderWithRouter(<Profile />);

    localStorage.setItem('user', JSON.stringify({
      email: 'teste@email.com',
    }));

    const emailUser = screen.getByTestId('profile-email');
    // expect(emailUser).toHaveTextContent('teste@email.com');

    localStorage.removeItem('user');
    expect(emailUser).toEqual(null);
  });
});
