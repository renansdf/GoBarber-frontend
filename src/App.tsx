import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './SignIn/index';
// import SignUp from './SignUp/index';

import AuthContext from './context/authContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Renan' }}>
      <SignIn />
    </AuthContext.Provider>

    <GlobalStyle />
  </>
);

export default App;
