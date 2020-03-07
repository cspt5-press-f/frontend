import React from "react";
import traverse from "./traverse";
import { connect } from "react-redux";
import { addResponse, updateLocation } from "../redux/actions";
import axios from "axios";

const MovementButtons = props => {
  const gameInit = () => {
    return axios
      .get("https://cspt5-f-mud-backend.herokuapp.com/api/adv/init/", {headers: {"Content-Type": "application/json",Authorization: `Token ${localStorage.getItem("mud_token")}`}})
      .then(res => {
          console.log("Game init response", res);
        return res;
      })
      .catch(err => {
        return err.message;
      });
  };

  const moveRequest = direction => {
    return axios
      .post(
        "https://cspt5-f-mud-backend.herokuapp.com/api/adv/move/",
        { direction: direction },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("mud_token")}`
          }
        }
      )
      .then(res => {
        return res;
      })
      .catch(err => {
        return err.message;
      });
  };

  const traverseHandler = async e => {
    console.log("Current coords", props.coords);
    const traverseReturn = await moveRequest(e.target.name);
    console.log("traverseReturn", traverseReturn);
    const moveResponse = traverseReturn.data;
    props.addResponse(`Current Location: ${traverseReturn.data.title}\nDescription: ${traverseReturn.data.description}\nItems Available: ${traverseReturn.data.items}`);
    props.updateLocation(moveResponse);
  };

  const initHandler = async e => {
    const initReturn = await gameInit();
    const initResponse = initReturn.data;
    initResponse.coord = [0,0]; // Backend doesn't provide starting coords, so we start at [0,0]
    props.updateLocation(initResponse);
    props.addResponse('Game Initialized!');
  };

  return (
    <div>
      <button type="button" name="startGame" onClick={initHandler}>
        Start Game
      </button>
      <div>
        <button type="button" name="n" onClick={traverseHandler}>
          N
        </button>
        <button type="button" name="w" onClick={traverseHandler}>
          W
        </button>
        <button type="button" name="s" onClick={traverseHandler}>
          S
        </button>
        <button type="button" name="e" onClick={traverseHandler}>
          E
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log("mapstatetoprops", state);
  return { coords: state.movement.coords };
};

export default connect(mapStateToProps, { addResponse, updateLocation })(
  MovementButtons
);
