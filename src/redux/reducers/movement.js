import { UPDATE_LOCATION } from "../actions/actionTypes";

const initialState = {
  coords: [0,0],
  map: [
    [true,false,true,true,true],
    [true,false,true,true,true],
    [true,true,false,true,true],
    [true,false,true,true,true],
    [true,true,true,true,true]
  ],
};

export const movement = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
        console.log("UPDATE_LOCATION",state, "action payload", action.payload)
        // change coords: action.payload to coords: action.payload.coords after vinny updates be
        // and add map: action.payload.map
      return { ...state, coords: action.payload.coord, map: action.payload.map}
    default:
      return state;
  }
};