import { ADD_RESPONSE } from "../actions/actionTypes";

const initialState = {
  responses: []
};

export const responses = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESPONSE:
      return { ...state, responses: [...state.responses, action.payload]}
    default:
      return state;
  }
};