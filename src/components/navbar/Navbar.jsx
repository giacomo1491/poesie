/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import { useTheme } from "../../ThemeContext";
import BurgerMenu from "./BurgerMenu";
import icons from "../icons";


const Navbar = () => {
  const {
    burgerMenuToggle,
    setBurgerMenuToggle,
    setValidationMenuToggle,
    menuBookToggle,
    setMenuBookToggle,
    currentUser,
    handleLogoutButton
  } = useTheme();

  const handleToggles = () => {
    !burgerMenuToggle ? setBurgerMenuToggle(true) : setBurgerMenuToggle(false);
    setValidationMenuToggle(false);
  };

  const handleValidationToggle = () => {
    setValidationMenuToggle(true);
  };

  const handleMenuBookToggle = () => {
    !menuBookToggle ? setMenuBookToggle(true) : setMenuBookToggle(false);
  };

  return (
    <div className="Navbar">
      <ul className="topMenu">
        <li>
          <icons.GiBookCover
            onClick={() => {
              handleMenuBookToggle();
            }}
            className="reactIcons"
            // style={{ margin: "0" }}
          />
          <icons.TiArrowSortedDown style={{ margin: "-20% -10%" }} />
        </li>

        {!burgerMenuToggle && (
          <li>
            <icons.GiHamburgerMenu
              className="menuIcon"
              onClick={handleToggles}
            />
          </li>
        )}
      </ul>

      {burgerMenuToggle && (
        <BurgerMenu
          currentUser={currentUser}
          handleToggles={handleToggles}
          handleValidationToggle={handleValidationToggle}
          handleLogoutButton={handleLogoutButton}
        />
      )}
    </div>
  );
};

export default Navbar;
