import React, { useState, useContext } from 'react';
import useMediaQuery from './components/useMediaQuery';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [navActive, setNavActive] = useState([false, false, false, false]);
  const devices = {
    iPHone4: useMediaQuery('(max-width: 320px) and (max-height: 480px)'),
    mobilePortrait: useMediaQuery('(max-width: 567px)'),
    mobileLandscape: useMediaQuery('(min-width: 568px) and (max-width: 767px)'),
    tabletPortrait: useMediaQuery('(min-width: 768px) and (max-width: 1023px)'),
    tabletLandscape: useMediaQuery('(min-width: 1024px) and (max-width: 1365px)'),
    laptopDisplays: useMediaQuery('(min-width: 1366px) and (max-width: 1679px)'),
    desktopDisplays: useMediaQuery('(min-width: 1680px)'),
  };

  // const devices = {
  //   mobilePortrait: '(max-width: 567px)',
  //   mobileLandscape: '(max-width: 767px)',
  //   tabletPortrait: '(max-width: 1023px)',
  //   tabletLandscape: '(max-width: 1365px)',
  //   laptopDisplays: '(max-width: 1679px)',
  //   desktopDisplays: '(min-width: 1680px)',
  // };
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const loadUsers = async () => {
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
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
      method: 'GET',
      credentials: 'include',
    };
    const response = await fetch(`${backendUrl}/login/logout`, requestOptions);
    if (response.ok) {
      setUserName('');
      setPassword('');
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loadUsers,
        userName,
        setUserName,
        password,
        setPassword,
        handleLogoutButton,
        navActive,
        setNavActive,
        backendUrl,
        devices,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
