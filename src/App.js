import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
      </BrowserRouter>
    </div>
  );
}

export default App;
