import React from 'react';
import traverse from "./traverse";
import { connect } from "react-redux";
import { addResponse } from "../redux/actions";

const MovementButtons = (props) => {
    const traverseHandler = (e) => {
        const traverseReturn = traverse(e.target.name, [0,0]);
        props.addResponse(JSON.stringify(traverseReturn));
    }
    return (
    <div>
        <button type="button" name="n" onClick={traverseHandler}>N</button>
        <button type="button" name="w" onClick={traverseHandler}>W</button>
        <button type="button" name="s" onClick={traverseHandler}>S</button>
        <button type="button" name="e" onClick={traverseHandler}>E</button>
    </div>);
};

export default connect(null, {addResponse})(MovementButtons);