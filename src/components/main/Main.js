import './main.scss';
import { Switch, Route } from 'react-router-dom';
import Book from './libro/Book';
import Home from './home/Home';

// https://www.npmjs.com/package/react-pageflip

function Main() {
  return (
    <div className='Main'>
      <Switch>
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
