import RotatingText from "./RotatingText.jsx";
import '../CSS/HeroSection.css';
import ButtonComponent from "./ButtonComponent.jsx";

export function HeroSection() {
    return <div className="container">

        <div style={{display:"flex",justifyContent:'space-between' ,flexDirection:'row', alignItems:'flex-end', gap:'auto', maxWidth:1280}}>
            <div className="heroSectionTitle">
                <h1>
                    <span className="leftSectionTitle">
                        <span className="leftSectionFirstLine">
                            Explore Swasthya
                        </span>
                        <span className="leftSectionFirstLine">
                            Samparks's trusted,
                        </span>
                        <div className="leftSectionSecondLine">
                            <span className="leftSectionFirstLine">
                                online
                            </span>
                            <div>
                                <RotatingText/>
                            </div>
                        </div>
                    </span>
                </h1>
            </div>

            <div className="heroSectionRightPart">
                <div>
                    <h3>
                        <p className="h3">
                            Swasthya Sampark uses advanced Al technology to provide you with
                            comprehensive health assessment based on your symptoms. Get
                            personalized health reports, lab test recommendations, and treatment
                            suggestions.
                        </p>
                    </h3>
                </div>
                <div style={{display: "flex", flexDirection: "row", gap: "30px"}}>
                    <div style={{paddingTop:'40px'}}>
                        <ButtonComponent>
                            Get Started
                        </ButtonComponent>
                    </div>
                    <div style={{paddingTop:'40px'}}>
                        <ButtonComponent transparent={true}>
                            Learn More
                        </ButtonComponent>
                    </div>
                </div>

            </div>
        </div>
    </div>
}