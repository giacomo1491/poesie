import "./poems.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import PoemsNav from "./poemsNav";
import SinglePoem from "./singlePoem";
// import poemData from "../data";

function Poems() {
  return (
    <div className="poems--wrapper">
      <h3>Poems</h3>

      {/* NAVIGATION */}
      <PoemsNav />

      {/* ROUTING */}
      <Switch>
        <Route path="/">
          <SinglePoem />
        </Route>
        <Route path="/poem1">
          <SinglePoem />
        </Route>
        <Route path="/poem2">
          <SinglePoem />
        </Route>
        <Route path="/poem3">
          <SinglePoem />
        </Route>
      </Switch>
    </div>
  );
}

export default Poems;
