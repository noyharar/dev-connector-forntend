import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getProfileById} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import {useParams} from "react-router";
import ProfileExp from "./ProfileExp";
import ProfileEdu from "./ProfileEdu";

const Profile = ({
                     profile: {profile},
                     auth,
                     getProfileById
                 }) =>{
    const { id } = useParams();
    useEffect(() => {
        getProfileById(id);
    },[getProfileById, id]);


    return (
        <Fragment>
            {profile === null || auth.loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === profile.user._id && (
                        <Link to='/edit-profile' className='btn btn-dark'>
                            Edit Profile
                        </Link>
                    )}
                    <div className='profile-grid my-1'>
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <ProfileExp experience={profile.experience} />
                        <ProfileEdu education={profile.education} />
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};


Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
};
const mapStateToProps =  state => ({
    profile: state.profile,
    auth : state.auth
});

export default connect(
    mapStateToProps,{getProfileById})(Profile);
