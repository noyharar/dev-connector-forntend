import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProfileById} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import {useParams} from "react-router";

const ProfileAbout = ({
                          profile: {bio, skills, user: {name}},
                      }) =>{
    const { id } = useParams();

    useEffect(() => {
        getProfileById(id);
    },[getProfileById, id]);


    return (
        <div className='profile-about bg-light p-2'>
            {bio && (
                <Fragment>
                    <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
                    <p>{bio}</p>
                    <div className='line' />
                </Fragment>
            )}
            <h2 className='text-primary'>Skill Set</h2>
            <div className='skills'>
                {skills.map((skill, index) => (
                    <div key={index} className='p-1'>
                        <i className='fas fa-check' /> {skill}
                    </div>
                ))}
            </div>
        </div>
    );
};


ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
