import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk'
import alertReducer from './reducers/alertReducer';
import authReducer from './reducers/authReducer';
import profileReducer from "./reducers/profileReducer";
const initialState = {};

const middleware = [thunk];
const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer
});

const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store