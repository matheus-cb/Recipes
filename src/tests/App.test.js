import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

/* test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
}); */

describe('Testa o componente Profile', () => {
  it('Teste se o e-mail logado está renderizado na tela', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'teste@email.com');
    userEvent.type(password, '1478523');
    userEvent.click(buttonLogin);

    const buttonProfile = screen.getByTestId('profile-top-btn');

    userEvent.click(buttonProfile);

    const emailUser = screen.getByTestId('profile-email');
    expect(emailUser).toHaveTextContent('teste@email.com');

    const email2 = screen.getByTestId('profile-email');
    expect(email2).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);

    const clearBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(clearBtn);

    const emailInput = screen.getByTestId('email-input');

    expect(emailInput).toBeInTheDocument();
  });
});
