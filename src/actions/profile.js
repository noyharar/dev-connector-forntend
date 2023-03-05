import {
    GET_PROFILE,
    PROFILE_ERROR,
    CREATE_PROFILE,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    GET_REPOS
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

// Get Profile by id
export const getProfileById =  (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`);
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

// Get Github repos
export const getGithubRepos =  (username) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Get all profiles
export const getProfiles =  () => async (dispatch) => {
    dispatch({type: CLEAR_PROFILE});

    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
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
        const res = await axios.post('http://localhost:5000/api/profile',  formData,config);
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

// Add experience
export const addExperience =  (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('api/profile/experience',  formData,config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience added", 'success'));
        // history.push("/dashboard")
        return res.data;
    } catch (err) {
        console.log(err);
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

// Add education

export const addEducation=  (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put('http://localhost:5000/api/profile/education',  formData,config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education added", 'success'));
        // history.push('/dashboard')
        return res.data;
    } catch (err) {
        console.log(err);
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

// Delete experience
export const deleteExperience =  (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience removed", 'success'));

    } catch (err) {
        console.log(err);
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

// Delete education
export const deleteEducation =  (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education removed", 'success'));

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


// Delete account and profile
export const deleteAccount =  (id) => async (dispatch) => {
    if(window.confirm('Are you sure? This can NOT hbe undone!')) {
        try {
            const res = await axios.delete(`http://localhost:5000/api/profile`);
            dispatch({type: CLEAR_PROFILE,});
            dispatch({type: ACCOUNT_DELETED,});
            dispatch(setAlert("Your account has been permanently deleted"));

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
};