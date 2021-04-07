import { BrowserRouter as Link } from "react-router-dom";

function PoemsNav() {
  return (
    <nav className="poemnav--wrapper">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/poem1">Poem 1</Link>
        </li>
        <li>
          <Link to="/poem2">Poem 2</Link>
        </li>
        <li>
          <Link to="/poem3">Poem 3</Link>
        </li>
      </ul>
    </nav>
  );
}

export default PoemsNav;
