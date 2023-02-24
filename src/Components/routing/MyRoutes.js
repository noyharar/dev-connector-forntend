import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';


const MyRoutes = () => {
    return (
            <Routes>
                <Route exact path='/register' element={<Register/>} />
                <Route exact path='login' element={<Login/>} />
                {/*<PrivateRoute exact path='/dashboard' component={Dashboard} />*/}
            </Routes>
    );
};

export default MyRoutes;