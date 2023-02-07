import React, { useState, useContext } from "react";
import useMediaQuery from "./components/useMediaQuery";

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [burgerMenuToggle, setBurgerMenuToggle] = useState(false);
  const [menuBookToggle, setMenuBookToggle] = useState(false);
  const [validationMenuToggle, setValidationMenuToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [navActive, setNavActive] = useState([false, false, true, false]);
  const devices = {
    galaxyFold: useMediaQuery("(max-width: 280px) and (min-height: 653px)"),
    galaxyS3: useMediaQuery("(max-width: 360px) and (min-height: 639px)"),
    iPhone4: useMediaQuery("(max-width: 320px) and (max-height: 480px)"),
    pixel2: useMediaQuery(
      "(min-width: 410px) and (max-width: 767px) and (max-height: 731px)"
    ),
    pixel2XL: useMediaQuery(
      "(min-width: 410px) and (max-width: 767px) and (max-height: 823px)"
    ),
    iPhone5: useMediaQuery("(max-width: 320px) and (max-height: 568px)"),
    iPhone6: useMediaQuery("(max-width: 375px) and (max-height: 667px)"),
    iPhone10: useMediaQuery("(max-width: 375px) and (max-height: 812px)"),
    iPad: useMediaQuery("(max-width: 768px) and (max-height: 1024px)"),
    iPadPro: useMediaQuery("(max-width: 1024px) and (min-height: 1365px)"),
    nestHub: useMediaQuery("(min-width: 1024px)  and (max-height: 600px)"),
    nestHubMax: useMediaQuery("(min-width: 1279px) and (max-height: 800px)"),
    laptopDisplays: useMediaQuery(
      "(min-width: 1025px) and (max-width: 1679px)"
    ),
    desktopDisplays: useMediaQuery("(min-width: 1680px)"),
    smallView: useMediaQuery("(max-width: 750px)"),
  };

  

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const loadUsers = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      `${backendUrl}/login/currentuser`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setCurrentUser((prev) => ({ ...prev, ...data.user }));
    }
  };

  const handleLogoutButton = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(`${backendUrl}/login/logout`, requestOptions);
    if (response.ok) {
      setUserName("");
      setPassword("");
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        burgerMenuToggle,
        setBurgerMenuToggle,
        currentUser,
        setCurrentUser,
        loadUsers,
        userName,
        setUserName,
        password,
        setPassword,
        handleLogoutButton,
        validationMenuToggle,
        setValidationMenuToggle,
        backendUrl,
        devices,
        menuBookToggle,
        setMenuBookToggle,
        navActive,
        setNavActive,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
