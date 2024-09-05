import Marquee from "react-fast-marquee";
import Practo from './PractoLogo.tsx'
import StarHealthLogo from "./StarHealthLogo.tsx";
import TataMGLogo from "./TataMGLogo.tsx";
import BicaardLogo from "./BicaardLogo.tsx";
import BiotronicsLogo from "./BiotronicsLogo.tsx";

function MarqueeComponent() {
    return (
        <div className="bg-white flex justify-center py-8 sm:py-10 md:py-12 lg:py-14 my-8 sm:my-12 md:my-16 lg:my-24 w-full overflow-hidden">
            <div className="flex flex-col justify-center content-center w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-7xl items-center space-y-6 sm:space-y-8 md:space-y-10">
                <div className="w-full overflow-hidden">
                    <Marquee autoFill={true} gradient={true} gradientColor="white" pauseOnHover={true} speed={100}>
                        <div className="flex items-center space-x-8 sm:space-x-12 md:space-x-16 lg:space-x-20">
                            <Practo />
                            <StarHealthLogo />
                            <TataMGLogo />
                            <BicaardLogo />
                            <BiotronicsLogo />
                        </div>
                    </Marquee>
                </div>
                <div className="text-gray-700 font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-8 md:leading-10 tracking-wide text-center px-4">
                    We wanted to help dozens of organizations
                </div>
            </div>
        </div>
    );
}

export default MarqueeComponent;