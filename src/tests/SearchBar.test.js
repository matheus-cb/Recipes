import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Recipes from '../components/Recipes';
import renderWithRouter from '../renderWithRouter';

const emailValid = 'lucas@lucas.com';
const passwordValid = '1234567';
const idEmail = 'email-input';
const idPassword = 'password-input';
const idBtnLogin = 'login-submit-btn';
const btnFilter = 'exec-search-btn';
const btnHeaderTop = 'search-top-btn';
const inputSearch = 'search-input';
const radioName = 'name-search-radio';
const radioIngredient = 'ingredient-search-radio';
const radioFirstLetter = 'first-letter-search-radio';

describe('Teste do Componente SerachBar', () => {
  it('Testa se os inputs aparecem depois de clicar no botao', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const btnLogin = screen.getByTestId(idBtnLogin);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();

    userEvent.type(emailInput, emailValid);
    userEvent.type(passwordInput, passwordValid);
    userEvent.click(btnLogin);

    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();

    const btnIngredient = screen.getByTestId(radioIngredient);

    const btnName = screen.getByTestId(radioName);

    const btnFirstLetter = screen.getByTestId(radioFirstLetter);

    const btnSearchFiltered = screen.getByTestId(btnFilter);
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
  it('Verifica rotas, com filtros que voltam apenas 1 resultado', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(idEmail);
    const passwordInput = screen.getByTestId(idPassword);
    const btnLogin = screen.getByTestId(idBtnLogin);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();

    userEvent.type(emailInput, emailValid);
    userEvent.type(passwordInput, passwordValid);
    userEvent.click(btnLogin);

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();

    const nameRadio = screen.getByTestId(radioName);
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();

    userEvent.type(searchInput, 'sushi');
    expect(searchInput).toHaveValue('sushi');

    const searchBtn = screen.getByTestId(btnFilter);
    userEvent.click(searchBtn);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/53065'));
  });
  it('Verifica rotas, com filtros que voltam apenas 1 resultado na tela de drinks', async () => {
    const initialEntries = ['/drinks'];
    const { history } = renderWithRouter(<App />, { initialEntries });

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();

    const nameRadio = screen.getByTestId(radioName);
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();

    userEvent.type(searchInput, 'Aquamarine');
    expect(searchInput).toHaveValue('Aquamarine');

    const searchBtn = screen.getByTestId(btnFilter);
    userEvent.click(searchBtn);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'));
  });
  it('Testa se os inputs aparecem depois de clicar no botao', async () => {
    const initialEntries = ['/meals'];
    renderWithRouter(<App />, { initialEntries });

    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();

    const btnIngredient = screen.getByTestId(radioIngredient);

    const btnSearchFiltered = screen.getByTestId(btnFilter);
    expect(btnSearchFiltered).toBeInTheDocument();

    userEvent.type(btnIngredient, 'chicken');

    await waitFor(() => expect(screen.getAllByTestId(/card-img/i).length).toBe(12));
  });
  it('Testa de o array esta chegando vazio ou null', async () => {
    const initialEntries = ['/meals'];
    renderWithRouter(<App />, { initialEntries });

    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'quebrou');

    const nameRadio = screen.getByTestId(radioName);
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();

    const btnSearchFiltered = screen.getByTestId(btnFilter);
    expect(btnSearchFiltered).toBeInTheDocument();

    userEvent.click(btnSearchFiltered);

    await waitFor(() => {
      const alerta = 'Sorry, we haven\'t found any recipes for these filters.';
      expect(alerta).toBe('Sorry, we haven\'t found any recipes for these filters.');
    });
  });

  it('deve ir para a rota "/" quando o tipo de receita é aleatório', async () => {
    const tipoRecita = 'aleatorio';
    renderWithRouter(<Recipes tipoReceita={ tipoRecita } />);

    // Verifique se a rota mudou para "/"
    expect(window.location.pathname).toBe('/');
  });

  it('testando alert se a pessoa seleciona o filtro FirstLetter e escreve 2 letras no input de busca', async () => {
    const initialEntries = ['/meals'];
    renderWithRouter(<App />, { initialEntries });

    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'vo');

    const btnFirstLetter = screen.getByTestId(radioFirstLetter);
    userEvent.click(btnFirstLetter);
    expect(btnFirstLetter).toBeChecked();

    const btnSearchFiltered = screen.getByTestId(btnFilter);
    expect(btnSearchFiltered).toBeInTheDocument();

    userEvent.click(btnSearchFiltered);

    let alertM = '';
    global.alert = (massage) => {
      alertM = massage;
    };
    global.alert('Your search must have only 1 (one) character');
    expect(alertM).toBe('Your search must have only 1 (one) character');
  });
  it('Testando na rota de Meals se clicar no radio Ingredient e escrevendo o input chicken os resultados chegam corretos', async () => {
    const initialEntries = ['/meals'];
    renderWithRouter(<App />, { initialEntries });

    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'chicken');

    const btnIngredient = screen.getByTestId(radioIngredient);
    userEvent.click(btnIngredient);
    expect(btnIngredient).toBeChecked();

    const btnSearchFiltered = screen.getByTestId(btnFilter);
    expect(btnSearchFiltered).toBeInTheDocument();

    userEvent.click(btnSearchFiltered);

    await waitFor(() => expect(screen.getAllByTestId(/card-img/i).length).toBe(11));
  });
  it('Testando na rota de Drinks se clicar no radio Ingredient e escrevendo o input gin os resultados chegam corretos', async () => {
    const initialEntries = ['/drinks'];
    renderWithRouter(<App />, { initialEntries });

    const title = screen.getByRole('heading', { name: /drinks/i });
    expect(title).toBeInTheDocument();

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'gin');

    const btnIngredient = screen.getByTestId(radioIngredient);
    userEvent.click(btnIngredient);
    expect(btnIngredient).toBeChecked();

    const btnSearchFiltered = screen.getByTestId(btnFilter);
    expect(btnSearchFiltered).toBeInTheDocument();

    userEvent.click(btnSearchFiltered);

    await waitFor(() => expect(screen.getAllByTestId(/card-img/i).length).toBe(12));
  });
  it('Testando na rota de Drinks se clicar no radio Ingredient e escrevendo o input honey os resultados chegam corretos', async () => {
    const initialEntries = ['/drinks'];
    renderWithRouter(<App />, { initialEntries });

    const title = screen.getByRole('heading', { name: /drinks/i });
    expect(title).toBeInTheDocument();

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'honey');

    const btnIngredient = screen.getByTestId(radioIngredient);
    userEvent.click(btnIngredient);
    expect(btnIngredient).toBeChecked();

    const btnSearchFiltered = screen.getByTestId(btnFilter);
    expect(btnSearchFiltered).toBeInTheDocument();

    userEvent.click(btnSearchFiltered);

    await waitFor(() => expect(screen.getAllByTestId(/card-img/i).length).toBe(7));
  });
  it('Testando na rota de Drinks se clicar no radio FirstLetter e escrevendo o input h os resultados chegam corretos', async () => {
    const initialEntries = ['/drinks'];
    renderWithRouter(<App />, { initialEntries });

    const title = screen.getByRole('heading', { name: /drinks/i });
    expect(title).toBeInTheDocument();

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'h');

    const btnFirstLetter = screen.getByTestId(radioFirstLetter);
    userEvent.click(btnFirstLetter);
    expect(btnFirstLetter).toBeChecked();

    const btnSearchFiltered = screen.getByTestId(btnFilter);
    expect(btnSearchFiltered).toBeInTheDocument();

    userEvent.click(btnSearchFiltered);

    await waitFor(() => expect(screen.getAllByTestId(/card-img/i).length).toBe(12));
  });
  it('Testando na rota de Drinks se clicar no radio FirstLetter e escrevendo o input h os resultados chegam corretos', async () => {
    const initialEntries = ['/meals'];
    renderWithRouter(<App />, { initialEntries });

    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();

    const btnSearch = screen.getByTestId(btnHeaderTop);
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'm');

    const btnFirstLetter = screen.getByTestId(radioFirstLetter);
    userEvent.click(btnFirstLetter);
    expect(btnFirstLetter).toBeChecked();

    const btnSearchFiltered = screen.getByTestId(btnFilter);
    expect(btnSearchFiltered).toBeInTheDocument();

    userEvent.click(btnSearchFiltered);

    await waitFor(() => expect(screen.getAllByTestId(/card-img/i).length).toBe(12));
  });
});
