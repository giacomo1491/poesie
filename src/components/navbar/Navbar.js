import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';

function Navbar() {
  const { currentUser, handleLogoutButton, navActive, setNavActive } =
    useTheme();

  return (
    <ul className='Navbar'>
      {!navActive[0] && (
        <li onClick={() => setNavActive([true, false, false, false])}>
          <NavLink className='navLink' to='/'>
            <p>HOME</p>
          </NavLink>
        </li>
      )}
      {!navActive[1] && (
        <li onClick={() => setNavActive([false, true, false, false])}>
          <NavLink className='navLink' to='/book'>
            <p>LIBRO</p>
          </NavLink>
        </li>
      )}

      {!navActive[2] && (
        <li onClick={() => setNavActive([false, false, true, false])}>
          <NavLink className='navLink' to='/signup'>
            <p>SIGNUP</p>
          </NavLink>
        </li>
      )}

      {currentUser.accessGroups === 'loggedOutUsers' ||
      currentUser.accessGroups === 'undefined' ? (
        !navActive[3] && (
          <li onClick={() => setNavActive([false, false, true, true])}>
            <NavLink className='navLink' to='/login'>
              <p>LOGIN</p>
            </NavLink>
          </li>
        )
      ) : (
        <li>
          <p onClick={handleLogoutButton}>LOGOUT</p>
        </li>
      )}
    </ul>
  );
}

export default Navbar;
