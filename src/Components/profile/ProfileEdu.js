import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const ProfileEdu = ({education}) => {
    return (
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {education && education.length > 0 ? (
                    <Fragment>
                        {education.map(edu => (
                            <div key={edu._id}>
                                <h3>{edu.school}</h3>
                                <p><Moment format='YYYY/MM/DD'>{edu.form}</Moment> - {' '}{
                                    edu.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
                                }</p>
                                <p><strong>Degree: </strong>{edu.degree}</p>
                                <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                                <p>
                                    <strong>Description: </strong>
                                    {edu.description}
                                </p>
                            </div>
                        ))}
                    </Fragment> ) :
                (<h4>No education credentials</h4>)
            }
        </div>
    );
};

ProfileEdu.propTypes = {
    education: PropTypes.object.isRequired
};

export default ProfileEdu;