import RotatingText from "./RotatingText.jsx";
import '../CSS/HeroSection.css';
import ButtonComponent from "./ButtonComponent.jsx";

export function HeroSection() {
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
                                Swasthya Sampark uses advanced AI technology to provide you with
                                comprehensive health assessment based on your symptoms. Get
                                personalized health reports, lab test recommendations, and treatment
                                suggestions.
                            </p>
                        </h3>
                    </div>
                    <div className="buttonContainer">
                        <ButtonComponent>
                            Get Started
                        </ButtonComponent>
                        <ButtonComponent transparent={true}>
                            Learn More
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    );
}
