import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import {
  DashboardContainer,
  HeaderContainer,
  LoginContainer,
} from './containers';
import Login from './containers/LoginContainer';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <div className='app'>
        <HeaderContainer />
        <main>
          <Routes>
            <Route index element={<DashboardContainer />} />
            <Route path='login' element={<LoginContainer />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
