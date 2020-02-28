import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MainScreen from "./components/MainScreen";

function App(props) {
  return (
    <div className="App" id="container">
      <MainScreen />
      <Sidebar />
    </div>
  );
}

export default App;
