import React from 'react';

// Para as rotas, precisamos do Switch quando formos
// trocar de rotas e do Route para declarar cada rota
import { Switch } from 'react-router-dom';
import Route from './route';

// precisamos importar cada componente que representa
// uma página para declarar dentro de cada rota
import signIn from '../pages/SignIn';
import signUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={signIn} />
    <Route path="/signup" component={signUp} />

    <Route path="/Dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
