import { Link } from 'react-router-dom';
import './nav.css';

function Nav() {
  return (
    <div className='nav--wrapper'>
      <ul>
        {/* <li><a href="/"><h1>Name</h1></a></li> */}
        <li>
          <a href='#poemsNav'>Poesie</a>
        </li>
        <li>
          <Link to='/Preface'>
            <a href='#preface'>Prefazione</a>
          </Link>
        </li>

        <li>
          <Link to='/'>Contact</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
