import {Alert} from 'react-bootstrap';
import React from 'react'



const AlertMessage = ({  variant, children }) => {
    return <Alert variant={variant}>{children}</Alert>
};

AlertMessage.defaultProps = {
    variant: 'info',

};

export default AlertMessage