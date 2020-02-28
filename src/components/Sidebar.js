import React, { useState } from "react";
import { connect } from "react-redux";
import { addResponse } from "../redux/actions"

const Sidebar = ({responses}) => {
  //const [responses, setResponses] = useState(["hey","wassup"]);

  return (
    <div id="sidebar">
      <h1>Sidebar</h1>
      {responses.map(response => <div>{response}<br /><br /></div>)}
    </div>
  );
};

const mapStateToProps = state => {
    const responses = state.responses;
    return responses;

}

export default connect(mapStateToProps, { addResponse })(Sidebar);
