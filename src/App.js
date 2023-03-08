import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
// import DrinksInProgress from './pages/DrinksInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
// import MealsInProgress from './pages/MealsInProgress';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <div>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          {/* <Route
          path="/meals/:id/in-progress"
          render={ (props) => <Meals { ...props } /> }
        /> */}
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          {/* <Route path="/meals/:id-da-receita/in-progress" component={ MealsInProgress } />
          <Route
            path="/drinks/:id-da-receita/in-progress"
            component={ DrinksInProgress }
          /> */}
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
