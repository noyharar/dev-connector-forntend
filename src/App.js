import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Navbar from "./Components/layout/Navbar";
import Landing from "./Components/layout/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";

const App = () => {
    return (
        <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing/>} />
                    <Route path="register" element={<Register/>} />
                    <Route path="login" element={<Login />} />
                </Routes>
            </Router>
    )
};
export default App;
