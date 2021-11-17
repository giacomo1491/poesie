import './navbar.scss';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
  return (
    <div className='Navbar'>
      {/* <li>
        <NavLink to='/' exact={true} activeClassName='selected'>
          <p>HOME</p>
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink to='/libro' activeClassName='selected'>
          <p>LIBRO</p>
        </NavLink>
      </li> */}
      <ul>
        {props.navBanners.map((banner, index) => (
          <li key={index}>
            <NavLink
              to={banner === 'home' ? '' : banner}
              activeClassName='selected'
            >
              <p>{banner}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
