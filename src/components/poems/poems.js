import "./poems.css";
import { Switch, Route } from "react-router-dom";
import PoemsNav from "./poemsNav";
import SinglePoem from "./singlePoem";
import poemData from "../data.json";

function Poems() {
  return (
    <div className="poems--wrapper">
      {/* NAVIGATION */}
      <PoemsNav />

      {/* ROUTING */}
      <Switch>
        <Route exact path="/acque">
          <SinglePoem title={poemData.DiAcque.title} text={poemData.DiAcque.text} />
        </Route>
        <Route exact path="/terre">
          <SinglePoem title={poemData.poem1.title} text={poemData.poem1.text} />
        </Route>
        <Route exact path="/amori">
          <SinglePoem title={poemData.poem2.title} text={poemData.poem2.text} />
        </Route>
      </Switch>
    </div>
  );
}

export default Poems;
