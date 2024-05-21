import React from 'react';

const Section1 = ({children}) => {
    const sectionStyle = {
        display: 'flex',
        backgroundColor: '#F6F4F2',
        height: '1561px',
        width: '100vw', // Full viewport width
        margin: 0,
        padding: 0,
        position: 'relative', // Relative to the viewport
        left: '50%', // Move the left edge to the center
        right: '50%', // Move the right edge to the center
        transform: 'translate(-50%, 0)', // Shift it back to the left by 50% of its width
        flexDirection: 'column',
        gap: '5%',

    };

    return (
        <div style={sectionStyle}>
            {children}
        </div>
    );
};

export default Section1;
