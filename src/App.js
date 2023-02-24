import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import './App.css';
import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
import setAuthToken from "./Utils/setAuthToken";
import {Routes} from "react-router";
import Alert from "./Components/layout/Alert";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import PrivateRoute from "./Components/routing/PrivateRoute";
import Dashboard from "./Components/dashboard/Dashboard";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Alert />
                    <Routes>
                        <Route exact path='/' element={<Landing/>} />
                        <Route exact path='/register' element={<Register/>} />
                        <Route exact path='/login' element={<Login/>} />
                        {/*<Route exact path='/dashboard' element={<Dashboard/>} />*/}
                        {/*<PrivateRoute component={Dashboard} path="/dashboard" exact />*/}


                    </Routes>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;