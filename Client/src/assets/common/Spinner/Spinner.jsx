import React from 'react';
import BootstrapSpinner from 'react-bootstrap/Spinner';

const CustomSpinner = (props) => {

    return (
        props.spin ? 
            <div className="spinner-container"> 
                <div className="overlay"></div>
                <BootstrapSpinner className="custom-spinner" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </BootstrapSpinner>
            </div>
        : null 
    );
}

export default CustomSpinner;
