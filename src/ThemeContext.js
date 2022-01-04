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
   
    galaxyFold: useMediaQuery('(max-width: 280px) and (max-height: 653px)'),
    galaxyS3: useMediaQuery('(max-width: 360px) and (max-height: 640px)'),
    iPHone4: useMediaQuery('(max-width: 320px) and (max-height: 480px)'),
    pixel2: useMediaQuery('(max-width: 411px) and (max-height: 731px)'),
    pixel2XL: useMediaQuery('(max-width: 411px) and (max-height: 823px)'),
    iPhone5: useMediaQuery('(max-width: 320px) and (max-height: 568px)'),
    iPhone6: useMediaQuery('(max-width: 375px) and (max-height: 667px)'),
    iPhone6Plus: useMediaQuery('(max-width: 414px) and (max-height: 736px)'),
    iPhone10: useMediaQuery('(max-width: 375px) and (max-height: 812px)'),
    iPad: useMediaQuery('(max-width: 768px) and (max-height: 1024px)'),
    iPadPro: useMediaQuery('(max-width: 1024px) and (max-height: 1366px)'),
    surfaceDuo: useMediaQuery('(max-width: 540px) and (max-height: 720px)'),
    nestHub: useMediaQuery('(max-width: 1024px) and (max-height: 600px)'),
    nestHubMax: useMediaQuery('(max-width: 1280px) and (max-height: 800px)'),
    laptopDisplays: useMediaQuery(
      '(min-width: 1366px) and (max-width: 1679px)'
    ),
    desktopDisplays: useMediaQuery('(min-width: 1680px)'),
  };

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
