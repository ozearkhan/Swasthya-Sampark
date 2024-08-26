import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../CSS/RotatingText.css';

const words = ['Symptom ', 'Health ', 'Emergency ', 'Medical ', 'Urgency '];
const colors = ['#122431', '#175134', '#922F10', '#141518', '#B66E28'];

const RotatingText = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const updateWidth = () => {
        if (containerRef.current && textRef.current) {
            const textWidth = textRef.current.offsetWidth;
            containerRef.current.style.width = `${textWidth + 40}px`; // Add padding value to width
        }
    };

    useEffect(() => {
        // Using requestAnimationFrame to ensure the text has rendered before measuring width
        requestAnimationFrame(() => {
            updateWidth();
        });
    }, [currentWordIndex]);

    return (
        <div
            ref={containerRef}
            className="rotatingTextContainer"
            style={{ backgroundColor: colors[colorIndex] }}
        >
            <div ref={textRef} className="rotatingTextContent">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={words[currentWordIndex]}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {words[currentWordIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RotatingText;
