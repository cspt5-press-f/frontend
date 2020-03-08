import { GET_INVENTORY } from "../actions/actionTypes";

const initialState = {
  items: {}
};

export const getInventory = (state = initialState, action) => { 
  switch (action.type) {
    case GET_INVENTORY:
        console.log("GET_INVENTORY -> action payload:", action.payload)
      return {...state, items: action.payload }; // backend returns full list of player_items so we don't need spread operators here
    default:
      return state;
  }
};