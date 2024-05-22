import VectorDesign from "./VectorDesign.jsx";

export function HeroSectionBottomDiv() {
    return (
        <div className="flex justify-center px-4 md:px-6 lg:px-8">
            {/* Design for larger screens */}
            <div className="hidden md:flex items-center justify-center w-full max-w-[1280px] lg:max-w-[80%] xl:max-w-[55%] 2xl:max-w-[1360px] custom:max-w-[70%] custom-xl:max-w-[55%] h-auto bg-[#242424] rounded-[16px] p-4">
                <VectorDesign className="w-full h-full"></VectorDesign>
            </div>
            {/* Design for smaller screens */}
            <div className="flex md:hidden items-center justify-center w-full max-w-[95%] h-auto bg-[#242424] rounded-[16px] p-4">
                <VectorDesign className="w-full h-full"></VectorDesign>
            </div>
        </div>
    );
}
