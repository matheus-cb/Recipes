import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const btnShare = 'share-btn';
const local = '/meals/52977';
// const inprogress = {
// meals: { 52771: [] },
// drinks: { 178319: [] },
// };

// const savedFavorites = {
// id: '15997',
// type: 'drink',
// nationality: '',
// category: 'Ordinary Drinks',
// alcoholicOrNot: 'Optional alcohol',
// name: 'GG',
// image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
// };

describe('Testando a pagina de RecipeDetails', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });
  test('Testa o Botao de favoritar na rota de Meals', async () => {
    const initialEntries = [local];
    renderWithRouter(<App />, { initialEntries });

    const btnFavorite = screen.getByRole('img', { name: /botao favoritar/i });
    userEvent.click(btnFavorite);

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(4);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);
  });
  test('Testa o Botao de favoritar na rota de Drinks', async () => {
    const initialEntries = ['/drinks/15997'];
    renderWithRouter(<App />, { initialEntries });

    const btnFavorite = screen.getByRole('img', { name: /botao favoritar/i });
    userEvent.click(btnFavorite);

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(4);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'inProgressRecipes',
      '{"meals":{"52771":[]},"drinks":{"178319":[]}}',
    );
  });
  test('Se a renderizaçao da pagina de meals esta correta', () => {
    const initialEntries = ['/drinks'];
    renderWithRouter(<App />, { initialEntries });
  });

  test('Verifica se ao clicar no botao Start Recipe e redirecionado para a tela de RecipeInProgress', async () => {
    const initialEntries = [local];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const btnStartRecipe = screen.getByRole('button', { name: /start recipe/i });
    expect(btnStartRecipe).toBeInTheDocument();

    userEvent.click(btnStartRecipe);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977/in-progress'));
  });
  test('Se no click de compartilhar o link e copiado corretamente', async () => {
    const initialEntries = [local];
    renderWithRouter(<App />, { initialEntries });

    const btnCompartilhar = screen.getByTestId(btnShare);
    expect(btnCompartilhar).toBeInTheDocument();

    userEvent.click(btnCompartilhar);

    const linkCopied = screen.getByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52977');
  });
});
