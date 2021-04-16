import './poems.css';
import { Switch, Route } from 'react-router-dom';
import PoemsNav from './poemsNav';
// import SinglePoem from "./singlePoem";
// import poemData from "../data.json";
import { EQuestoIlGiorno } from '../poesie/DiAcque';
import { UnaVisivaMusicaAscolto } from '../poesie/DiTerra';
import { ComeLavorioMutoDiRondine } from '../poesie/DiAmori';

function Poems() {
  return (
    <div className='poems--wrapper'>
      {/* NAVIGATION */}
      <PoemsNav />

      {/* ROUTING */}
      {/* <Switch>
        <Route exact path="/acque">
          <SinglePoem title={poemData.DiAcque.title} text={poemData.DiAcque.text} />
        </Route>
        <Route exact path="/terre">
          <SinglePoem title={poemData.poem1.title} text={poemData.poem1.text} />
        </Route>
        <Route exact path="/amori">
          <SinglePoem title={poemData.poem2.title} text={poemData.poem2.text} />
        </Route>
      </Switch> */}

      <Switch>
        <Route exact path='/acque'>
          <EQuestoIlGiorno />
        </Route>
        <Route exact path='/terre'>
          <UnaVisivaMusicaAscolto />
        </Route>
        <Route exact path='/amori'>
          <ComeLavorioMutoDiRondine />
        </Route>
      </Switch>
    </div>
  );
}

export default Poems;
