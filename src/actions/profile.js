import {
    GET_PROFILE,
    PROFILE_ERROR,
    CREATE_PROFILE
} from "../actions/types";
import axios from 'axios';
import {setAlert} from "./alert";


// Get current Profile
export const getCurrentProfile =  () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Create or update profile

export const createProfile =  (formData, history, edit=false) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('http://localhost:5000/api/profile',  JSON.stringify(formData),config);

        dispatch({
            type: CREATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created'));
        if(!edit){
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};