import {
    GET_POST,
    POST_ERROR,
    GET_POSTS,
    UPDATE_LIKES,
    DELETE_POST,
    CREATE_PROFILE,
    PROFILE_ERROR,
    ADD_POST, REMOVE_COMMENT, ADD_COMMENT,
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

// Get all posts
export const getPosts=  () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get post by id
export const getPost=  (id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add like
export const addLike=  (id) => async (dispatch) => {
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload: {id, likes: res.data}
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Remove like
export const removeLike=  (id) => async (dispatch) => {
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`);
        dispatch({
            type:UPDATE_LIKES,
            payload: {id, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Delete post
export const deletePost=  (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/${id}`);
        dispatch({
            type:DELETE_POST,
            payload: id
        });
        dispatch(setAlert('Post removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add post
export const addPost =  (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('http://localhost:5000/api/posts',  formData,config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert(  'Post created', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Add comment
export const addComment =  (postId, formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, formData,  config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert(  'Comment created', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Delete comment
export const deleteComment =  (postId, commentId) => async (dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert(  'Comment removed', 'success'));

    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};