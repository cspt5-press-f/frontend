import { UPDATE_LOCATION, GET_INVENTORY } from "../actions/actionTypes";

const initialState = {
  coords: [0,0],
  items: []
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


export const getInventory = (state = initialState, action) => { 
  switch (action.type) {
    case GET_INVENTORY:
        console.log("GET_INVENTORY -> action payload:", action.payload)
      return {...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};