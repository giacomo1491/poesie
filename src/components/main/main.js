import "./main.css";
import { Switch, Route } from 'react-router-dom';
import Poems from "../poems/poems";
import Preface from "./Preface";
function Main() {
  return (
    <div className="main--wrapper">
      {/* <h2>Poesie</h2> */}
      <Poems />

      <Switch>
        <Route exact path="/Preface">
        <Preface />
        </Route>
      </Switch>
      
    </div>
  );
}

export default Main;
