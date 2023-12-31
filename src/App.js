import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import RecipeInProgress from './pages/RecipeInProgress';
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
          <Route
            exact
            path="/meals/:id"
            render={ (props) => <RecipeDetails { ...props } /> }
          />
          <Route
            exact
            path="/drinks/:id"
            render={ (props) => <RecipeDetails { ...props } /> }
          />
          <Route
            path="/meals/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            path="/drinks/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
