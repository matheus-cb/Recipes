import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from '../renderWithRouter';

const mock = [{
  alcoholicOrNot: '',
  category: 'Side',
  doneDate: '2023-03-12T14:38:55.206Z',
  id: '53060',
  image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  name: 'Burek',
  nationality: 'Croatian',
  tags: ['Streetfood', ' Onthego'],
  type: 'meal',
}];
const drink = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drinks',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
}];

describe('Component DoneRecipes', () => {
  test('Se os botões estão na tela ', () => {
    renderWithRouter(<DoneRecipes />);

    const btn1 = screen.getByRole('button', { name: /all/i });
    expect(btn1).toBeInTheDocument();
    const btn2 = screen.getByRole('button', { name: /meals/i });
    expect(btn2).toBeInTheDocument();
    const btn3 = screen.getByRole('button', { name: /drinks/i });
    expect(btn3).toBeInTheDocument();
  });
  test('Se a imagem está na tela ', () => {
    renderWithRouter(<DoneRecipes />);

    const img = screen.getByRole('img', { name: /burek/i });
    expect(img.image).toBe('https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg');
  });
  test('Se a nacionalidade e category estão na tela ', () => {
    renderWithRouter(<DoneRecipes />);

    const natycategory = screen.getByText(/croatian - side/i);
    expect(natycategory).toBeInTheDocument();
  });
  test('Se o nome  está na tela ', () => {
    renderWithRouter(<DoneRecipes />);

    const name = screen.getByText(/burek/i);
    expect(name).toBeInTheDocument();
  });
  test('Se a data  está na tela ', () => {
    renderWithRouter(<DoneRecipes />);

    const date = screen.getByText(/2023-03-12t14:38:55\.206z/i);
    expect(date).toBeInTheDocument();
  });
  test('Se o botão compartilhar na está na tela ', async () => {
    renderWithRouter(<DoneRecipes />);

    const btnCompartilhar = screen.getByRole('img', {
      name: /compartilhar/i,
    });
    expect(btnCompartilhar).toBeInTheDocument();

    userEvent.click(btnCompartilhar);

    const linkCopied = screen.getByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/53060');
  });
  test('Se a imagem e redireciona para outra tela ', async () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    const img = screen.getByRole('img', { name: /burek/i });
    userEvent.click(img);
    await waitFor(
      () => {
        expect(history.location.pathname).toBe('/meals/53060');
      },
    );
  });
  test('Se o name  e redireciona para outra tela ', async () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    const name = screen.getByText(/burek/i);
    userEvent.click(name);
    await waitFor(
      () => {
        expect(history.location.pathname).toBe('/meals/53060');
      },
    );
  });
  test('Se os botão meal filtra', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mock));
    // const initialEntries = [local];
    renderWithRouter(<DoneRecipes />);

    const btn1 = screen.getByRole('button', { name: /all/i });
    userEvent.click(btn1);

    // const { history } = renderWithRouter(<DoneRecipes />);

    // const btn1 = screen.getByRole('button', { name: /all/i });
    // userEvent.click(btn1);
    // await waitFor(() => expect(history.location.pathname).toBe('http://localhost:3000/done-recipes'));
    // expect(btn1).toBeInTheDocument();
    // const btn2 = screen.getByRole('button', { name: /meals/i });
    // expect(btn2).toBeInTheDocument();
    // const btn3 = screen.getByRole('button', { name: /drinks/i });
    // expect(btn3).toBeInTheDocument();
  });
  test('Se os botão drinks filtra', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(drink));
    // const initialEntries = [local];
    renderWithRouter(<DoneRecipes />);

    const btn1 = screen.getByRole('button', { name: /all/i });
    userEvent.click(btn1);
  });
});
