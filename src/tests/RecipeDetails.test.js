import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const btnShare = 'share-btn';
const local = '/meals/52977';
// const inprogress = {
// meals: { 52771: [] },
// drinks: { 178319: [] },
// };

const savedFavoritesMeals = [{
  id: '15997',
  type: 'meal',
  nationality: 'Turkish',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
}];

const savedFavoritesDrinks = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drinks',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
}];

describe('Testando a pagina de RecipeDetails', () => {
  test('Testa o Botao de favoritar na rota de Meals', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(savedFavoritesMeals));
    const initialEntries = [local];
    renderWithRouter(<App />, { initialEntries });

    const btnFavorite = await screen.findByRole('img', { name: /botao favoritar/i });
    userEvent.click(btnFavorite);
  });
  test('Testa o Botao de favoritar na rota de Drinks', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(savedFavoritesDrinks));
    const initialEntries = ['/drinks/15997'];
    renderWithRouter(<App />, { initialEntries });

    const btnFavorite = await screen.findByRole('img', { name: /botao favoritar/i });
    userEvent.click(btnFavorite);
    expect(btnFavorite.src.includes('whiteHeartIcon')).toBe(true);
    act(() => {
      userEvent.click(btnFavorite);
    });
    console.log(btnFavorite.src);
    expect(btnFavorite.src.includes('blackHeartIcon')).toBe(true);
  });
  test('Se a renderizaçao da pagina de meals esta correta', () => {
    const initialEntries = ['/meals/52977'];
    renderWithRouter(<App />, { initialEntries });

    const titleRecipe = screen.getByTestId('recipe-title');
    expect(titleRecipe).toBeInTheDocument();

    const RecipePhoto = screen.getByTestId('recipe-photo');
    expect(RecipePhoto).toBeInTheDocument();

    const categoryRecipe = screen.getByTestId('recipe-category');
    expect(categoryRecipe).toBeInTheDocument();

    const instructionsRecipe = screen.getByTestId('instructions');
    expect(instructionsRecipe).toBeInTheDocument();

    const videoRecipe = screen.getByTitle(/youtube video player/i);
    expect(videoRecipe).toBeInTheDocument();
  });
  test('Se a renderizaçao da pagina de drinks esta correta', () => {
    const initialEntries = ['/drinks/15997'];
    renderWithRouter(<App />, { initialEntries });

    const titleRecipe = screen.getByTestId('recipe-title');
    expect(titleRecipe).toBeInTheDocument();

    const RecipePhoto = screen.getByTestId('recipe-photo');
    expect(RecipePhoto).toBeInTheDocument();

    const categoryRecipe = screen.getByTestId('recipe-category');
    expect(categoryRecipe).toBeInTheDocument();

    const instructionsRecipe = screen.getByTestId('instructions');
    expect(instructionsRecipe).toBeInTheDocument();

    const videoRecipe = screen.getByTitle(/youtube video player/i);
    expect(videoRecipe).toBeInTheDocument();
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
  test('Testa o Botao de favoritar na rota de Drink', async () => {
    // localStorage.setItem('favoriteRecipes', JSON.stringify(savedFavoritesMeals));
    const initialEntries = [local];
    renderWithRouter(<App />, { initialEntries });

    await screen.findByRole('heading', { name: /corba/i });

    const btnFavorite = await screen.getByTestId('favorite-btn');
    expect(btnFavorite.src.includes('whiteHeartIcon')).toBe(true);
    act(() => {
      userEvent.click(btnFavorite);
    });
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log(btnFavorite.src);
    expect(btnFavorite.src.includes('blackHeartIcon')).toBe(true);
  });
});
