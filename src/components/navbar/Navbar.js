import './navbar.scss';
import { NavLink } from 'react-router-dom';


function Navbar() {
  return (
    <div className='Navbar'>
      <li>
        <NavLink to='/' exact={true} activeClassName='selected'>
          <p>HOME</p>
        </NavLink>
      </li>
      <li>
        <NavLink to='/libro' activeClassName='selected'>
          <p>LIBRO</p>
        </NavLink>
      </li>
      <li>
        <NavLink to='/about' activeClassName='selected'>
          <p>ABOUT</p>
        </NavLink>
      </li>
      <li>
        <NavLink to='/contatti' activeClassName='selected'>
          <p>CONTATTI</p>
        </NavLink>
      </li>
  
    
    </div>
  );
}

export default Navbar;
