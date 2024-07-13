// @ts-ignore
import React from 'react';
import styled from 'styled-components';
import { HeroSection } from "./HeroSection.tsx";
import { HeroSectionBottomDiv } from "./HeroSectionBottomDiv.tsx";
import '../CSS/HeroSection.css';
import Footer from "./Footer.tsx";

const Section = styled.div`
    display: flex;
    background-color: #F6F4F2;
    height: 100%;
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

const Section1 = () => {
    return (
        <Section>
            <HeroSection />
            <HeroSectionBottomDiv />
            <div className="flex justify-center items-center my-10">
                <h2 className="text-lg max-w-6xl text-center text-gray-700 font-semibold">
                    Swasthya Sampark utilizes advanced AI technology to offer you a thorough health assessment. Once the assessment is complete, you’ll receive a personalized health report with potential diagnoses.
                </h2>
            </div>
            <Footer/>
        </Section>
    );
};

export default Section1;
