import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';

function Navbar() {
  const { currentUser, handleLogoutButton } = useTheme();

  return (
    <ul className='Navbar'>
      <li>
        <NavLink className='navLink' to='/'>
          <p>HOME</p>
        </NavLink>
      </li>
      <li>
        <NavLink className='navLink' to='/book'>
          <p>LIBRO</p>
        </NavLink>
      </li>
      <li>
        <NavLink className='navLink' to='/signup'>
          <p>SIGNUP</p>
        </NavLink>
      </li>
      {currentUser.accessGroups === 'loggedOutUsers' ||
      currentUser.accessGroups === 'undefined' ? (
        <li>
          <NavLink className='navLink' to='/login'>
            <p>LOGIN</p>
          </NavLink>
        </li>
      ) : (
        <li>
          <p onClick={handleLogoutButton}>LOGOUT</p>
        </li>
      )}
    </ul>
  );
}

export default Navbar;
