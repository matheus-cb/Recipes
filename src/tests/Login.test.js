import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from '../renderWithRouter';

describe('Componente Login', () => {
  const LOGIN_EMAIL = 'email-input';
  const LOGIN_PASSWORD = 'password-input';
  const LOGIN_BTN = 'login-submit-btn';

  test('renderiza formulário de login com campo de email, senha e botão de envio', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD);
    const submitButton = screen.getByTestId(LOGIN_BTN);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('atualiza o estado de email e senha quando o usuário insere valores nos campos', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD);

    userEvent.type(emailInput, 'example@test.com');
    userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('example@test.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('o botão de envio é desabilitado quando o email e a senha são inválidos', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD);
    const submitButton = screen.getByTestId(LOGIN_BTN);

    userEvent.type(emailInput, 'example@test');
    userEvent.type(passwordInput, 'pass');

    expect(submitButton).toBeDisabled();
  });

  test('salva o email do usuário no localStorage quando o botão de envio é clicado', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(LOGIN_EMAIL);
    const passwordInput = screen.getByTestId(LOGIN_PASSWORD);
    const submitButton = screen.getByTestId(LOGIN_BTN);

    userEvent.type(emailInput, 'trybe@test.com');
    userEvent.type(passwordInput, 'password111');
    userEvent.click(submitButton);

    // Acessamos o localStorage através do método getItem('user'), que retorna o valor armazenado com a chave 'user'.
    // Utilizamos o método JSON.parse para transformar a string que obtivemos do localStorage em um objeto JavaScript.
    // Atribuímos o objeto resultante a uma variável chamada user.
    // Testamos se a propriedade email desse objeto é igual a 'trybe@test.com', utilizando o método toBe do objeto expect do Jest.
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user.email).toBe('trybe@test.com');
  });
});
