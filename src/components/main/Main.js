import './main.scss';
import React,{useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import Book from './libro/Book';
import Home from './home/Home';
import Signup from './signup/Signup'
import Login from './login/Login'
import { useTheme } from '../../ThemeContext';

// https://www.npmjs.com/package/react-pageflip

function Main() {
  const { loadUsers } = useTheme();
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='Main'>
      <Switch>
      <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/libro'>
          <Book />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
