import "./nav.css";

function Nav() {
  return (
    <div className="nav--wrapper">
        <ul>
            <li><a href="/"><h1>Name</h1></a></li>
            <li><a href="/">Poems</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Contact</a></li>
        </ul>
    </div>
  );
}

export default Nav;
