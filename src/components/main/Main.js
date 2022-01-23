import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Book from './Book';
import Home from './Home';
import Signup from '../validation/Signup';
import Login from '../validation/Login';
import { useTheme } from '../../ThemeContext';

// https://www.npmjs.com/package/react-pageflip

const Main = () => {
  const { loadUsers } = useTheme();
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='Main'>
      <Routes>
        <Route path='/book' element={<Book />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route exact path='/' element={<Home />}></Route>
      </Routes>
    </div>
  );
};

export default Main;
