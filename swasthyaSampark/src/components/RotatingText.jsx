import React, { useState, useEffect, useRef } from 'react';
import '../CSS/RotatingText.css';

const words = ['Symptom Analysis', 'Health Guidance', 'Emergency Detection', 'Medical Prioritization', 'Urgency Assessment'];
const colors = ['#122431', '#175134', '#922F10', '#141518', '#B66E28'];

const RotatingText = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current && textRef.current) {
                const textWidth = textRef.current.offsetWidth;
                containerRef.current.style.width = `${textWidth + 40}px`; // Add padding value to width
            }
        };
        updateWidth();
    }, [currentWordIndex]);

    return (
        <div
            ref={containerRef}
            className="rotatingTextContainer"
            style={{ backgroundColor: colors[colorIndex] }}
        >
            <div className="rotatingTextContent">
                <p ref={textRef}>{words[currentWordIndex]}</p>
            </div>
        </div>
    );
};

export default RotatingText;
