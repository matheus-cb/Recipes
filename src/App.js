import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
// import DrinksInProgress from './pages/DrinksInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
// import MealsInProgress from './pages/MealsInProgress';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        {/* <Route
          path="/meals/:id/in-progress"
          render={ (props) => <Meals { ...props } /> }
        /> */}
        {/* <Route path="/meals/:id-da-receita" component={ Profile } />
        <Route path="/drinks/:id-da-receita" component={ Profile } />
        <Route path="/meals/:id-da-receita/in-progress" component={ MealsInProgress } />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          component={ DrinksInProgress }
        /> */}
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>

    </div>
  );
}

export default App;
