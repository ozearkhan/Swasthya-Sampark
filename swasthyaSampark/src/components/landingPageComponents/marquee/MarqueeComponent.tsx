import Marquee from "react-fast-marquee";
import Practo from './PractoLogo.tsx'
import StarHealthLogo from "./StarHealthLogo.tsx";
import TataMGLogo from "./TataMGLogo.tsx";
import BicaardLogo from "./BicaardLogo.tsx";
import BiotronicsLogo from "./BiotronicsLogo.tsx";

function MarqueeComponent() {
    return (
        <div className="bg-white flex justify-center py-14 my-24 max-w-full">
            <div className="flex flex-col justify-center content-center max-w-7xl items-center space-y-10">
                <Marquee autoFill={true} gradient={true} gradientColor="white" pauseOnHover={true} speed={100}>
                    <Practo />
                    <StarHealthLogo />
                    <TataMGLogo />
                    <BicaardLogo />
                    <BiotronicsLogo />
                </Marquee>
                <div className="text-gray-700 font-semibold leading-10 tracking-wide">
                    We wanted to help dozens of organizations
                </div>
            </div>
        </div>
    );
}

export default MarqueeComponent;
