import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const emailValid = 'lucas@lucas.com';
const passwordValid = '1234567';

describe('Teste do Componente SerachBar', () => {
  it('Teste Title', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();
  });
  it('Testa se os inputs aparecem depois de clicar no botao', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();

    userEvent.type(emailInput, emailValid);
    userEvent.type(passwordInput, passwordValid);
    userEvent.click(btnLogin);

    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const btnIngredient = screen.getByTestId('ingredient-search-radio');

    const btnName = screen.getByTestId('name-search-radio');

    const btnFirstLetter = screen.getByTestId('first-letter-search-radio');

    const btnSearchFiltered = screen.getByTestId('exec-search-btn');
    expect(btnSearchFiltered).toBeInTheDocument();

    waitFor(() => {
      expect(btnIngredient).toBeInTheDocument();
      expect(btnName).toBeInTheDocument();
      expect(btnFirstLetter).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(btnName);
      userEvent.click(btnSearchFiltered);
      userEvent.click(btnIngredient);
      userEvent.type(searchInput, 'chicken');
    });
  });
});
