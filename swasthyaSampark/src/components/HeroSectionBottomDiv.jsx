export function HeroSectionBottomDiv() {
    return (
        <div className="flex justify-center">
            {/* Design for larger screens */}
            <div className="hidden md:flex items-center justify-center w-full max-w-[1360px] h-[725px] bg-[#242424] rounded-[16px]">
                {/* Your large screen design */}
            </div>
            {/* Design for smaller screens */}
            <div className="flex md:hidden items-center justify-center w-full h-[400px] bg-[#242424] rounded-[16px]">
                {/* Your small screen design */}
            </div>
        </div>
    );
}


