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
                    <h1 className="h1">
                        <span className="leftSectionTitle">
                            <span className="leftSectionFirstLine">
                                Swasthya Sampark's
                            </span>
                            <span className="leftSectionFirstLine">
                                trusted, online <RotatingText />
                            </span>
                        </span>
                    </h1>
                </div>
                <div className="heroSectionRightPart">
                    <div>
                        <h3 className="h3">
                            Swasthya Sampark utilizes AI for accurate health assessments, tailored reports, convenient online consultations, and a helpful AI assistant
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
