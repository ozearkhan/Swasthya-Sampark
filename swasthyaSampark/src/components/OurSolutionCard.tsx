import ButtonComponent from "./ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";

const OurSolutionCard = ({ imgSrc, heading, body }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/survey");
    };

    return (
        <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img
                    className="rounded-t-lg object-cover h-[360px] w-full" // Adjusted image height
                    src={imgSrc}
                    alt=""
                />
            </a>
            <div className="p-5">
                <a href="#">
                    <h2 className="h2 py-4">
                        {heading}
                    </h2>
                </a>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 py-2 tracking-wider px-0">
                    {body}
                </p>
                <div className="py-4">
                    <ButtonComponent transparent={true} onClick={handleClick}>
                        Learn More
                    </ButtonComponent>
                </div>
            </div>
        </div>
    );
};

export default OurSolutionCard;
