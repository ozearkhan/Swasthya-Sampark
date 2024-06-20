import React from 'react';
import '../CSS/ButtonComponent.css';

const ButtonComponent = ({ children, transparent = false }) => {
    const buttonClass = transparent ? 'buttonComponentTransparent' : 'buttonComponent';
    return (
        <button className={buttonClass}>
            {children}
        </button>
    );
};

export default ButtonComponent;
