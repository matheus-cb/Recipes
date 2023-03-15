import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../renderWithRouter';

describe('Componente Header', () => {
  const SEARCH_INPUT = 'search-input';
  const SEARCH_BTN = 'search-top-btn';

  test('renderiza os componentes no Header', () => {
    renderWithRouter(<Header title="title" searchOn />);

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('title');
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  test('verifica se o botão de perfil redireciona para a página de perfil', () => {
    const { history } = renderWithRouter(<Header title="title" searchOn />);

    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('verifica se o botão de pesquisa alterna a visibilidade do input de pesquisa', async () => {
    // Esse código é assíncrono porque estamos usando o método findByTestId() para encontrar o input de pesquisa que deve estar visível após o clique no botão de pesquisa. findByTestId() é um método assíncrono que retorna uma promessa que é resolvida quando o elemento é encontrado. Portanto, precisamos usar o await para aguardar a promessa ser resolvida antes de prosseguir com o teste.
    renderWithRouter(<Header title="title" searchOn />);

    const searchButton = screen.getByTestId(SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();

    const searchInput = screen.queryByTestId(SEARCH_INPUT);
    expect(searchInput).not.toBeInTheDocument();

    userEvent.click(searchButton);
    const visibleSearchInput = await screen.findByTestId(SEARCH_INPUT);
    expect(visibleSearchInput).toBeInTheDocument();

    userEvent.click(searchButton);
    const hiddenSearchInput = screen.queryByTestId(SEARCH_INPUT);
    expect(hiddenSearchInput).not.toBeInTheDocument();
  });

  test('verifica se o icone de pesquisa é renderizado quando searchOn é verdadeiro', () => {
    renderWithRouter(<Header title="title" searchOn />);

    const searchButton = screen.getByTestId(SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();

    const searchIcon = screen.queryByAltText('imagem de pesquisa');
    expect(searchIcon).toBeInTheDocument();
  });

  test('verifica se nada é renderizado quando searchOn é falso', () => {
    renderWithRouter(<Header title="title" searchOn={ false } />);

    const searchButton = screen.queryByTestId(SEARCH_BTN);
    expect(searchButton).not.toBeInTheDocument();

    const searchIcon = screen.queryByAltText('imagem de pesquisa');
    expect(searchIcon).not.toBeInTheDocument();
  });
});
