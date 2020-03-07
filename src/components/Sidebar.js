import React from "react";
import { connect } from "react-redux";
import { addResponse } from "../redux/actions"
import MovementButtons from "./MovementButtons";
import Map from "./map";

const Sidebar = ({responses}) => {

  return (
    <div id="sidebar">
      <h1>Sidebar</h1>
      <div style={{height: "60vh", overflow: "auto"}}>
        <div style={{color: "white"}}>{responses[responses.length-1]}</div>
      </div>
      <Map baseUrl={'http://127.0.0.1:8000'}/>
      <MovementButtons />
    </div>
  );
};

const mapStateToProps = state => {
    const responses = state.responses;
    return responses;

}

export default connect(mapStateToProps, { addResponse })(Sidebar);
