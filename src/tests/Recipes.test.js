// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from '../renderWithRouter';
// import App from '../App';
// import RecipesContext from '../context/RecipesContext';
// // import Cards from '../components/Cards';
// // import Categories from '../components/Categories';
// // import Recipes from '../components/Recipes';

// describe('Testando o componente "Cards" que está sendo renderizado na página de Recipes', () => {
//   test('Testando o componente Cards', () => {
//     renderWithRouter(
//       <RecipesContext>
//         <App />
//       </RecipesContext>,
//     );
//     const email = screen.getByTestId('email-input');
//     const password = screen.getByTestId('password-input');
//     const buttonLogin = screen.getByTestId('login-submit-btn');
//     userEvent.type(email, 'teste@trybe.com');
//     userEvent.type(password, '1478523');
//     userEvent.click(buttonLogin);

//     const h2 = screen.getByRole('heading', { level: 2 });
//     expect(h2).toBeInTheDocument();

//     const img = screen.getByRole('img');
//     expect(img).toBeInTheDocument();
//   });

//   test('', () => {
//     renderWithRouter(
//       <RecipesContext>
//         <App />
//       </RecipesContext>,
//     );
//     const email = screen.getByTestId('email-input');
//     const password = screen.getByTestId('password-input');
//     const buttonLogin = screen.getByTestId('login-submit-btn');
//     userEvent.type(email, 'teste@trybe.com');
//     userEvent.type(password, '1478523');
//     userEvent.click(buttonLogin);

//     const btnCategoryAll = screen.getByRole('button', { name: /all/i });
//     userEvent.click(btnCategoryAll);
//     // const img = screen.getAllByRole('img');
//     // expect(img).toHaveLength(12);
//   });
// });
