import React, { useState, useEffect } from 'react';
import '../CSS/RotatingText.css';

const words = ['Symptom Analysis', 'Health Guidance', 'Emergency Detection', 'Medical Prioritization', 'Urgency Assessment'];
const colors = ['#122431', '#25884C', '#922F10', '#141518', '#B66E28'];

const RotatingText = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rotatingText" style={{ backgroundColor: colors[colorIndex] }}>
            <p>{words[currentWordIndex]}</p>
        </div>
    );
};

export default RotatingText;
