import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../renderWithRouter';

describe('Componente Header', () => {
  test('renderiza os componentes no Header', () => {
    renderWithRouter(<Header title="title" searchOn />);

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('title');
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });
});
