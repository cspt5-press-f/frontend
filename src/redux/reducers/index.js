import { combineReducers } from "redux";
import {responses} from "./responses";
import {movement} from "./movement";
import { getInventory } from "./movement";

export default combineReducers({
	// add additional reducers with:
	// ${reducer_name},
	responses, movement, getInventory
});
