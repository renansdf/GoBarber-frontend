import React from 'react';

// Para as rotas precisamos importar o Browser Router no
// elemento que representa nosso app
import { BrowserRouter as Router } from 'react-router-dom';
// e além dele precisamos das configurações de rotas que fizemos
import Routes from './routes';

import GlobalStyle from './styles/global';

import AppProvider from './hooks/appProvider';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
