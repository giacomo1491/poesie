import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';

const Navbar = () => {
  const { currentUser, handleLogoutButton, navActive} =
    useTheme();

  return (
    <ul className='Navbar'>
      {!navActive[0] && (
        <li>
          <NavLink className='navLink' to='/'>
            <p>HOME</p>
          </NavLink>
        </li>
      )}
      {!navActive[1] && (
        <li>
          <NavLink className='navLink' to='/book'>
            <p>LIBRO</p>
          </NavLink>
        </li>
      )}
      {!navActive[2] && (
        <li>
          <NavLink className='navLink' to='/signup'>
            <p>SIGNUP</p>
          </NavLink>
        </li>
      )}
      {currentUser.accessGroups === 'loggedOutUsers' ? (
         !navActive[3] && (
          <li>
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
        {/* {currentUser.accessGroups !== 'loggedInUsers' 
       ? (
        !navActive[3] && (
          <li>
            <NavLink className='navLink' to='/login'>
              <p>LOGIN</p>
            </NavLink>
          </li>
        )
      ) : (
        <li>
          <p onClick={handleLogoutButton}>LOGOUT</p>
        </li>
      )} */}
    </ul>
  );
}

export default Navbar;
