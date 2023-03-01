import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import {connect} from "react-redux";
import {deleteExperience} from "../../actions/profile";

const ProfileExp = ({experience}) => {
    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {experience && experience.length > 0 ? (
                <Fragment>
                    {experience.map(exp => (
                    <div key={exp._id}>
                        <h3 className="text-dark">{exp.company}</h3>
                        <p><Moment format='YYYY/MM/DD'>{exp.form}</Moment> - {' '}{
                            exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                        }</p>
                        <p><strong>Position: </strong>{exp.title}</p>
                        <p>
                            <strong>Description: </strong>
                            {exp.description}
                        </p>
                    </div>
                    ))}
                </Fragment> ) :
                (<h4>No experience credentials</h4>)
            }
        </div>
    );
};

ProfileExp.propTypes = {
    experience: PropTypes.array.isRequired,
};
export default ProfileExp;
