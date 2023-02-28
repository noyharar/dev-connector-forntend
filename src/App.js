import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';


// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import './App.css';
import setAuthToken from "./Utils/setAuthToken";
import Landing from "./Components/layout/Landing";
import Navbar from "./Components/layout/Navbar";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Alert from "./Components/layout/Alert";
import PrivateRoute from "./Components/routing/PrivateRoute";
import Dashboard from "./Components/dashboard/Dashboard";
import CreateProfile from "./Components/profile-forms/CreateProfile";
import EditProfile from "./Components/profile-forms/EditProfile";
import AddExperience from "./Components/profile-forms/AddExperience";
import AddEducation from "./Components/profile-forms/AddEducation";

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
                <Navbar/>
                <Alert />
                <Routes>
                    <Route exact path='/' element={<Landing/>} />
                    <Route exact path='/register' element={<Register/>} />
                    <Route exact path='/login' element={<Login/>} />
                    {/*<Route exact path='/dashboard' element={<Dashboard/>} />*/}
                    {/*<Route exact path='/create-profile' element={<CreateProfile/>} />*/}
                    {/*<Route exact path='/edit-profile' element={<EditProfile/>} />*/}
                    {/*<Route exact path='/add-experience' element={<AddExperience/>} />*/}
                    {/*<Route exact path='/add-education' element={<AddEducation/>} />*/}
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute component={Dashboard} />}
                    />
                    <Route
                        path='/create-profile'
                        element={<PrivateRoute component={CreateProfile} />}
                    />
                    <Route
                        path='/edit-profile'
                        element={<PrivateRoute component={EditProfile} />}
                    />
                    <Route
                        path='/add-experience'
                        element={<PrivateRoute component={AddExperience} />}
                    />
                    <Route
                        path='/add-education'
                        element={<PrivateRoute component={AddEducation} />}
                    />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;