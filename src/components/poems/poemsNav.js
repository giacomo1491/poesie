import { Link } from "react-router-dom";

function PoemsNav() {
  return (
    <nav className="poemnav--wrapper">
      <ul>
        <li>
          <Link to="/acque">Di acque</Link>
        </li>
        <li>
          <Link to="/terre">Di terre</Link>
        </li>
        <li>
          <Link to="/amori">Di amori</Link>
        </li>
      </ul>
    </nav>
  );
}

export default PoemsNav;
