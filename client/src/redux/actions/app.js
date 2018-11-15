import {SET_APP_NAME} from "../consts/app";

export const setAppName = (newName) => ({
	type: SET_APP_NAME,
	payload: newName
})