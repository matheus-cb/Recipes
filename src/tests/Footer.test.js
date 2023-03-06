import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from '../renderWithRouter';

describe('Componente Footer', () => {
  test('Se os botões aparecem na tela', () => {
    renderWithRouter(<Footer />);
    
    const drinkBtn = screen.getByTestId("drinks-bottom-btn");
    const mealBtn = screen.getByTestId("meals-bottom-btn");

    expect(drinkBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
  });
});