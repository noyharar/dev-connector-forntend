import {SET_ALERT,REMOVE_ALERT} from "../actions/types";
// import uuid from 'uuid';
import {v4 as uuid} from "uuid"

export const setAlert = (msg, alertType) => async (dispatch,getState) => {
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    });
};