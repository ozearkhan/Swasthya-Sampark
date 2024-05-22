import React from 'react';
import styled from 'styled-components';
import { HeroSection } from "./HeroSection.jsx";
import { HeroSectionBottomDiv } from "./HeroSectionBottomDiv.jsx";

const Section = styled.div`
    display: flex;
    background-color: #F6F4F2;
    height: 1661px;
    width: 100vw;
    margin: 0;
    padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    transform: translate(-50%, 0);
    flex-direction: column;
    gap: 5%;

    @media (max-width: 1440px) {
        gap: 3%;
    }
    @media (max-width: 1024px) {
        gap: 3%;
    }
    @media (max-width: 768px) {
        gap: 2%;
    }
    @media (max-width: 480px) {
        gap: 1%;
    }
`;

const Section1 = ({ children }) => {
    return (
        <Section>
            <HeroSection />
            <HeroSectionBottomDiv />
            <div className="flex justify-center items-center">
                <h3 className="text-gray-700 font-poppins text-xl text-center font-normal leading-7 tracking-tighter flex-wrap max-w-screen-sm">
                    Swasthya Sampark is your personal health navigator. We transform the way you understand and manage your symptoms,
                    making healthcare more accessible and personalized. With us, every symptom is a step towards better health.
                </h3>
            </div>
        </Section>
    );
};

export default Section1;
