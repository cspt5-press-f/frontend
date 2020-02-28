import { ADD_RESPONSE, UPDATE_LOCATION } from "./actionTypes";

export const addResponse = data => {
    console.log("addResponse action", data);
    return ({
    type: ADD_RESPONSE,
    payload: data
})}

export const updateLocation = location => {
    return ({
        type: UPDATE_LOCATION,
        payload: location
    })
}