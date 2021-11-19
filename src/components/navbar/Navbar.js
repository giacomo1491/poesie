import './navbar.scss';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
  return (
    <ul className='Navbar'>
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
  );
}

export default Navbar;
