import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import {setAlert} from "../../actions/alert";
import {useDispatch } from 'react-redux'
import AlertMessage from "../layout/AlertMessage";

const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        password2: ''
    });
    const [alertMessage,setAlertMessage] = useState(null);
    const { name, email, password, password2} = formData;

    const dispatch = useDispatch();

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit =  e => {
        e.preventDefault();
        if(password !== password2){
            setAlertMessage('Passwords dont match');
            // dispatch(setAlert("Passwords dont match", 'danger'))
            // console.log('Passwords dont match');
        }else{
            setAlertMessage(null);

            //register

        }
    };

    return <Fragment>
        {alertMessage && <AlertMessage variant='danger'>{alertMessage}</AlertMessage>}
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
            <i className="fas fa-user"> </i> Create Your Account
        </p>
        <form className ="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
            <div className="form-group" >
                <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)}/>
                <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={e => onChange(e)}/>
            </div>
            <div className="form-group">
                <input type="password" placeholder="Confirm Password" name="password2" minLength="6" value={password2} onChange={e => onChange(e)}/>
            </div>
            <input type="submit" className="btn btn-primary"  value="Register"/>
        </form>
        <p className="my-1"> Already have an account?
            <Link to="login">Sign In</Link>
        </p>
    </Fragment>
};

export default Register;