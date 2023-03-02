import {DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES, ADD_POST} from "../actions/types";


const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
};

function postReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POST:
            return{
                ...state,
                loading: false,
                post: payload
            };
        case ADD_POST:
            return{
                ...state,
                loading: false,
                posts: [payload, ...state.posts]
            };
        case GET_POSTS:
            return{
                ...state,
                loading: false,
                posts: payload
            };
            case DELETE_POST:
            return{
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== payload)
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, likes: payload.likes } : post
                ),
                loading: false
            };

        case POST_ERROR:
            return{
                ...state,
                loading: false,
                error: payload,
            };

        default:
            return state;
    }
}

export default postReducer;