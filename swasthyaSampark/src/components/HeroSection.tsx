import RotatingText from "./RotatingText.tsx";
import '../CSS/HeroSection.css';
import ButtonComponent from "./ButtonComponent.tsx";
import {useNavigate} from "react-router-dom";

export function HeroSection() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/survey');
    }


    return (
        <div className="container">
            <div className="heroSectionContent">
                <div className="heroSectionTitle">
                    <h1>
                        <span className="leftSectionTitle">
                            <span className="leftSectionFirstLine">
                                Explore Swasthya
                            </span>
                            <span className="leftSectionFirstLine">
                                Sampark's trusted,
                            </span>
                            <div className="leftSectionSecondLine">
                                <span className="leftSectionFirstLine">
                                    online
                                </span>
                                <div>
                                    <RotatingText />
                                </div>
                            </div>
                        </span>
                    </h1>
                </div>
                <div className="heroSectionRightPart">
                    <div>
                        <h3>
                            <p className="h3">
                                Swasthya Sampark uses AI to provide health assessments,
                                personalized reports, lab test recommendations,
                                and treatment suggestions.
                            </p>
                        </h3>
                    </div>
                    <div className="buttonContainer">
                        <ButtonComponent onClick={handleClick} >
                            Get Started
                        </ButtonComponent>
                        <ButtonComponent transparent={true} onClick={handleClick}>
                            Learn More
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    );
}
