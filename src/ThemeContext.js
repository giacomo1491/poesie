import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [navActive, setNavActive] = useState([false, false, false, false]);
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
