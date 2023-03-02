import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

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
import Profiles from "./Components/profiles/Profiles";
import Profile from "./Components/profile/Profile";
import Posts from "./Components/posts/Posts";

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
                    <Route exact path='/profiles' element={<Profiles/>} />
                    <Route exact path='/profile/:id' element={<Profile/>} />
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
                    <Route
                        path='/posts'
                        element={<PrivateRoute component={Posts} />}
                    />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;