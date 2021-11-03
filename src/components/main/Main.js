import './main.scss';
import { Switch, Route } from 'react-router-dom';
import Preface from './preface/Preface';
import Libro from './libro/Libro';
import Home from './home/Home';

// https://www.npmjs.com/package/react-pageflip

function Main() {
  return (
    <div className='Main'>

    
      <Switch>
        <Route exact path='/Preface'>
          <Preface />
        </Route>
        <Route exact path='/libro'>
          <Libro />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
