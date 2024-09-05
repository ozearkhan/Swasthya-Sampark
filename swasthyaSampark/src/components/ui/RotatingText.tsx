import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../../CSS/RotatingText.css';

const words = ['Triage', 'Health Guidance', 'HealthGPT', 'Symptom Analysis', 'Report Summary'];
const colors = ['#122431', '#175134', '#922F10', '#141518', '#B66E28'];

const RotatingText = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);

    const measureTextWidth = (text: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.whiteSpace = 'nowrap';
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.fontSize = 'inherit';
        tempDiv.style.fontFamily = 'inherit';
        tempDiv.style.fontWeight = 'inherit';
        tempDiv.textContent = text;
        document.body.appendChild(tempDiv);
        const width = tempDiv.offsetWidth;
        document.body.removeChild(tempDiv);
        return width;
    };

    useEffect(() => {
        // Update the width when the word changes
        if (textRef.current && containerRef.current) {
            const currentText = words[currentWordIndex];
            const measuredWidth = measureTextWidth(currentText);
            setContainerWidth(measuredWidth + 40); // Add padding to the width
        }
    }, [currentWordIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="rotatingTextContainer"
            style={{
                backgroundColor: colors[colorIndex],
                width: containerWidth ? `${Math.max(containerWidth + 240, 200)}px` : 'auto',
            }}
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
