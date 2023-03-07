import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Profile', () => {
  test('renderiza os componentes no Profile', () => {
    renderWithRouter(<Profile />);

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });
});
