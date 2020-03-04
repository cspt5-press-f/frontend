import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import FormScreens from "./components/FormScreens";
import Game from "./components/Game";
import MovementButtons from "./components/MovementButtons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const token = localStorage.getItem("mud_token");

function App(props) {
  return (
    <Router>
      <div className="App" id="app-container">
        <Switch>
          <Route exact path="/">
            <div id={token && "container"}>
              <div id="gamePanel">
                <Game />
              </div>
              {token && <Sidebar />}
            </div>
          </Route>
          <Route path={["/login", "/registration"]}>
            <FormScreens />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
