import { NavLink } from "react-router-dom";
import icons from "../icons";

function BurgerMenu(props) {
  return (
    <ul
      className="burgerMenu"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <icons.MdOutlineClose
        className="menuIconClosed"
        onClick={props.handleToggles}
      />
      <li onClick={props.handleToggles}>
        <NavLink className="navLink" to="/">
          <icons.FaHome className="reactIcons" /> HOME
        </NavLink>
      </li>
      <li
        onClick={() => {
          props.handleToggles();
          props.handleValidationToggle();
        }}
        style={{ cursor: "pointer" }}
      >
        <icons.SiGnuprivacyguard className="reactIcons" />
        LOGIN
      </li>

      <li onClick={props.handleToggles}>
        <NavLink className="navLink" to="/account">
          <icons.MdManageAccounts className="reactIcons" />
          ACCOUNT
        </NavLink>
      </li>
      <li onClick={props.handleToggles}>
        <NavLink className="navLink" to="/about">
          <icons.BsInfoSquareFill className="reactIcons" />
          ABOUT
        </NavLink>
      </li>

      <li onClick={props.handleToggles}>
        <a
          className="navLink"
          href="mailto:duiliadias@gmail.com"
          target="blank"
        >
          <icons.FiMail className="reactIcons" />
          duiliadias@gmail.com
        </a>
      </li>
    </ul>
  );
}

export default BurgerMenu;
