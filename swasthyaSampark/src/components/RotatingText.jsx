import React, { useState, useEffect } from 'react';
import '../CSS/RotatingText.css'; // Import the CSS file

const words = ['Symptom Analysis', 'Health Guidance', ' Emergency Detection', 'Medical Prioritization', ' Urgency Assessment'];
const colors = ['#122431', '#25884C', '#922F10', '#141518', '#B66E28']; // Add as many colors as you like

const RotatingText = () => {
    const [colorIndex, setColorIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(words[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((colorIndex + 1) % colors.length); // Change color index after each rotation
            setCurrentWord(words[colorIndex]); // Change word after each rotation
        }, 2000); // Change every 2 seconds
        return () => clearInterval(interval);
    }, [colorIndex]);

    const cardStyle = {
        padding: '20px',
        borderRadius: '15px',
        color: 'white',
        backgroundColor: colors[colorIndex],
        display: 'inline-block',
        margin: 'auto',
        marginTop: '0px'
    };

    return (
        <div style={cardStyle}>
            <p>{currentWord}</p>
        </div>
    );
};

export default RotatingText;
