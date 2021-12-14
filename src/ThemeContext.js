import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  const loadUsers = async () => {
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };
    const response = await fetch(
      'http://localhost:9000/login/currentuser',
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setCurrentUser((prev) => ({ ...prev, ...data.user }));
    }
  };

  return (
    <ThemeContext.Provider value={{ currentUser, setCurrentUser, loadUsers }}>
      {children}
    </ThemeContext.Provider>
  );
}
