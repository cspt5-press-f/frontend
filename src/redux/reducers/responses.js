import { ADD_RESPONSE } from "../actions/actionTypes";

const initialState = {
  responses: ["yo", "hey"]
};

export const responses = (state = initialState, action) => {
    console.log("responses reducer state", state, "payload", action.payload)
  switch (action.type) {
    case ADD_RESPONSE:
      //return { ...state, responses: state.responses.append(action.payload) };
      return { ...state, responses: [...state.responses, action.payload]}
      //return state;
    default:
      return state;
  }
};