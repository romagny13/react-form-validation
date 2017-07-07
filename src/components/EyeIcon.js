import React from 'react';
import PropTypes from 'prop-types';


export const Eye = (props) => {
        return (
            <svg width={props.width} height={props.height} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path fill={props.fill} d="M13 7.5q-1.187-1.844-2.977-2.758 0.477 0.813 0.477 1.758 0 1.445-1.027 2.473t-2.473 1.027-2.473-1.027-1.027-2.473q0-0.945 0.477-1.758-1.789 0.914-2.977 2.758 1.039 1.602 2.605 2.551t3.395 0.949 3.395-0.949 2.605-2.551zM7.375 4.5q0-0.156-0.109-0.266t-0.266-0.109q-0.977 0-1.676 0.699t-0.699 1.676q0 0.156 0.109 0.266t0.266 0.109 0.266-0.109 0.109-0.266q0-0.672 0.477-1.148t1.148-0.477q0.156 0 0.266-0.109t0.109-0.266zM14 7.5q0 0.266-0.156 0.539-1.094 1.797-2.941 2.879t-3.902 1.082-3.902-1.086-2.941-2.875q-0.156-0.273-0.156-0.539t0.156-0.539q1.094-1.789 2.941-2.875t3.902-1.086 3.902 1.086 2.941 2.875q0.156 0.273 0.156 0.539z" />
            </svg>
        );
};
Eye.propTypes = {
    fill: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};
Eye.defaultProps = {
    fill: '#555',
    width: '12',
    height: '12'
};