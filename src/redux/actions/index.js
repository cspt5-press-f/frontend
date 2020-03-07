import { ADD_RESPONSE, UPDATE_LOCATION, GET_INVENTORY } from './actionTypes';
import axios from 'axios';

export const addResponse = data => {
    console.log('addResponse action', data);
    return {
        type: ADD_RESPONSE,
        payload: data
    };
};

export const updateLocation = location => {
    return {
        type: UPDATE_LOCATION,
        payload: location
    };
};

export const getInventory = inventory => {
    return {
        type: GET_INVENTORY,
        payload: inventory
    };
};
