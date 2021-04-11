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
        <Route exact path="/poem1">
          <SinglePoem title={poemData.poem1.title} text={poemData.poem1.text} />
        </Route>
        <Route exact path="/poem2">
          <SinglePoem title={poemData.poem2.title} text={poemData.poem2.text} />
        </Route>
        <Route exact path="/poem3">
          <SinglePoem title={poemData.poem3.title} text={poemData.poem3.text} />
        </Route>
        <Route exact path="/">
          <SinglePoem title={poemData.poem.title} text={poemData.poem.text} />
        </Route>
      </Switch>
    </div>
  );
}

export default Poems;
