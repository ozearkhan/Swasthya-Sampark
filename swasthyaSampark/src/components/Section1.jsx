import React from 'react';
import {HeroSection} from "./HeroSection.jsx";
import {HeroSectionBottomDiv} from "./HeroSectionBottomDiv.jsx";

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
            <HeroSection/>
            <HeroSectionBottomDiv/>
            <div className="flex justify-center items-center ">
                <h3 className="text-gray-700 font-poppins text-xl text-center font-normal leading-7 tracking-tighter flex-wrap max-w-screen-sm">
                    Swasthya Sampark is your personal health navigator. We transform the way you understand and manage your symptoms,
                    making healthcare more accessible and personalized. With us, every symptom is a step towards better health

                </h3>
            </div>
        </div>
    );
};

export default Section1;
