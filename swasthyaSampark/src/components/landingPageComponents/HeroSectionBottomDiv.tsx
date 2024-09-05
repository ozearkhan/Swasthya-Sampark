import VectorDesign from "../../../public/bg/VectorDesign.tsx";
import BlurFade from "../magicui/blur-fade.tsx";
// import Ripple from "./magicui/ripple.tsx";

export function HeroSectionBottomDiv() {
    return (
        <BlurFade delay={1.5} duration={0.6} blur="2px">
            <div className="flex justify-center px-4 md:px-6 lg:px-10">
                {/* Design for all screens */}
                <div
                    className="flex items-center justify-center w-full h-auto bg-[#242424] rounded-[16px] p-4 max-w-[95%] sm:max-w-[80%] md:max-w-[95%] lg:max-w-[95%] xl:max-w-[85%] 2xl:max-w-[70%] custom:max-w-[90%] custom-xl:max-w-[55%]">
                    <VectorDesign className="w-full h-full"></VectorDesign>
                </div>
                {/*<Ripple numCircles={16} mainCircleOpacity={1}/>*/}
            </div>
        </BlurFade>

    );
}
