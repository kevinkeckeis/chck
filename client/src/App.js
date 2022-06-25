import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import Welcome from './features/auth/Welcome';
import RequireAuth from './features/auth/RequireAuth';
import CategoriesList from './features/categories/CategoriesList';

import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <CssBaseline enableColorScheme>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route index element={<Public />} />
          <Route path='login' element={<Login />} />

          {/* public routes kevin*/}
          <Route element={<RequireAuth />}>
            <Route path='welcome' element={<Welcome />} />
            <Route path='categories' element={<CategoriesList />} />
          </Route>
        </Route>
      </Routes>
    </CssBaseline>
  );
}

export default App;
