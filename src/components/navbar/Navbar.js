import './navbar.scss';
import { NavLink } from 'react-router-dom';
import Contatti from "./contatti/Contatti";


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
          <p>PREFAZIONE</p>
        </NavLink>
      </li>
      <Contatti />
   
  
    
    </div>
  );
}

export default Navbar;
