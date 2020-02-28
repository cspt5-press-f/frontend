import React from 'react';
import traverse from "./traverse";
import { connect } from "react-redux";
import { addResponse, updateLocation } from "../redux/actions";

const MovementButtons = (props) => {
    const traverseHandler = (e) => {
        console.log("Current coords", props.coords);
        const traverseReturn = traverse(e.target.name, props.coords);
        const newCoords = traverseReturn.coord;
        props.addResponse(JSON.stringify(traverseReturn));
        props.updateLocation(newCoords);
    }
    return (
    <div>
        <button type="button" name="n" onClick={traverseHandler}>N</button>
        <button type="button" name="w" onClick={traverseHandler}>W</button>
        <button type="button" name="s" onClick={traverseHandler}>S</button>
        <button type="button" name="e" onClick={traverseHandler}>E</button>
    </div>);
};

const mapStateToProps = (state) => {
    console.log("mapstatetoprops", state);
    return {coords: state.movement.coords};
}

export default connect(mapStateToProps, {addResponse, updateLocation })(MovementButtons);