import { useState, useEffect } from 'react';
import RotatingText from "../ui/RotatingText.tsx";
import '../../CSS/HeroSection.css';
import ButtonComponent from "../ui/ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
import BlurFade from "../magicui/blur-fade.tsx";

export function HeroSection() {
    const navigate = useNavigate();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1080);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1080);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = () => {
        navigate('/survey');
    }

    return (
        <div className="container">
            <div className="heroSectionContent">
                <div className="heroSectionTitle">
                    <h1 className="h1">
                        <BlurFade delay={0.3} blur="6px" duration={1} inView>
                            <span className="leftSectionTitle">
                                <span className="leftSectionFirstLine">
                                    Swasthya Sampark's
                                </span>
                                <span className="leftSectionSecondLine">
                                    trusted, online{' '}
                                    {isLargeScreen ? (
                                        <RotatingText />
                                    ) : (
                                        <span className="staticText">healthcare</span>
                                    )}
                                </span>
                            </span>
                        </BlurFade>
                    </h1>
                </div>
                <div className="heroSectionRightPart">
                    <BlurFade delay={1} duration={0.8} inView>
                        <div>
                            <h3 className="h3">
                                Swasthya Sampark utilizes AI for accurate health assessments, tailored reports,
                                convenient online consultations, and a helpful AI assistant
                            </h3>
                        </div>
                    </BlurFade>
                    <BlurFade delay={2} duration={0.4} inView>
                        <div className="buttonContainer">
                            <ButtonComponent onClick={handleClick}>
                                Get Started
                            </ButtonComponent>
                            <ButtonComponent transparent={true} onClick={handleClick}>
                                Learn More
                            </ButtonComponent>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </div>
    );
}