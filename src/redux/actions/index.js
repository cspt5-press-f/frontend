import { ADD_RESPONSE } from "./actionTypes";

export const addResponse = data => {
    console.log("addResponse action", data);
    return ({
    type: ADD_RESPONSE,
    payload: data
})}