import React from 'react';

// Para as rotas, precisamos do Switch quando formos
// trocar de rotas e do Route para declarar cada rota
import { Switch } from 'react-router-dom';
import Route from './route';

// precisamos importar cada componente que representa
// uma página para declarar dentro de cada rota
import signIn from '../pages/SignIn';
import signUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={signIn} />
    <Route path="/signup" component={signUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
