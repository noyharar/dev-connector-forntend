import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
            case UPDATE_PROFILE:
            return{
                ...state,
                loading: false,
                profile: payload
            };
        case GET_PROFILES:
            return{
                ...state,
                loading: false,
                profiles: payload
            };
        case GET_REPOS:
            return{
                ...state,
                loading: false,
                repos: payload
            };
        case PROFILE_ERROR:
            return{
                ...state,
                loading: false,
                error: payload,
            };
            case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                repos: [],
                loading: false,
            };
        default:
            return state;
    }
}