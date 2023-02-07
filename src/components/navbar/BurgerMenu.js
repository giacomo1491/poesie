import { NavLink, useNavigate } from "react-router-dom";
import icons from "../icons";

function BurgerMenu(props) {
  const navigate = useNavigate();
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
      {props.currentUser.userName === "anonymousUser" ? (
        <li
          onClick={() => {
            props.handleToggles();
            props.handleValidationToggle();
            navigate("/login");
          }}
          style={{ cursor: "pointer" }}
        >
          <icons.SiGnuprivacyguard className="reactIcons" />
          LOGIN
        </li>
      ) : (
        <li
          onClick={() => {
            props.handleToggles();
            props.handleValidationToggle();
            props.handleLogoutButton();
          }}
          style={{ cursor: "pointer" }}
        >
          <icons.BiLogOutCircle className="reactIcons" />
          LOGOUT
        </li>
      )}

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
