import { UPDATE_LOCATION } from "../actions/actionTypes";

const initialState = {
  coords: [0,0]
};

export const movement = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
        console.log("UPDATE_LOCATION",state, "action payload", action.payload)
      return { ...state, coords: action.payload}
    default:
      return state;
  }
};