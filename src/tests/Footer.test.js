import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from '../renderWithRouter';

describe('Componente Footer', () => {
  test('Se o botão Drinks leva para o local correto', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinkButton).toBeInTheDocument();
    userEvent.click(drinkButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  test('Se o botão Meals leva para o local correto', () => {
    const { history } = renderWithRouter(<Footer />);

    const mealButton = screen.getByTestId('meals-bottom-btn');
    expect(mealButton).toBeInTheDocument();
    userEvent.click(mealButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
