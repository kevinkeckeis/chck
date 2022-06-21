import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>CHCK</h1>
      <nav>
        <ul>
          <NavLink to='/'>
            <li>Dashboard</li>
          </NavLink>
          <NavLink to='/'>
            <li>Categories</li>
          </NavLink>
          <NavLink to='/checklists'>
            <li>Checklists</li>
          </NavLink>
          <NavLink to='/settings'>
            <li>Settings</li>
          </NavLink>
          <NavLink to='/login'>
            <li>Login</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
