import VectorDesign from "./VectorDesign.jsx";

export function HeroSectionBottomDiv() {
    return (
        <div className="flex justify-center px-4 md:px-2">
            {/* Design for larger screens */}
            <div className="hidden md:flex items-center justify-center w-full max-w-[1360px] h-auto bg-[#242424] rounded-[16px] p-4">
                <VectorDesign className="w-full h-full"></VectorDesign>
            </div>
            {/* Design for smaller screens */}
            <div className="flex md:hidden items-center justify-center w-full h-auto bg-[#242424] rounded-[16px] p-4">
                <VectorDesign className="w-full h-full"></VectorDesign>
            </div>
        </div>
    );
}
