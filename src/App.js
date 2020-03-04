import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import FormScreens from "./components/FormScreens";
import Game from "./components/Game";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <div className="App" id="app-container">
        <Switch>
          <Route exact path="/">
            <div id="welcome">
            <Game />
            </div>
          </Route>
          <Route exact path="/game">
            <Sidebar />
          </Route>
          <Route path={["/login","/registration"]}>
            <FormScreens />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
