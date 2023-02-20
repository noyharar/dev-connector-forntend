import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk'
import {setAlertReducer} from './reducers/alert'

const initialState = {

};

const middleware = [thunk];
const rootReducer = combineReducers({
    setAlert: setAlertReducer
});

const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store