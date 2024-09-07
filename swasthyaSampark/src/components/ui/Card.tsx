import ButtonComponent from "./ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";

const Card = ({ svg, heading, body }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/survey')
    }

    return (
        <div className="flex w-full">
            <div className="w-full max-w-lg p-6 sm:p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end py-4">
                    {svg}
                </div>

                <h2 className="h2 py-2 text-4xl sm:text-4xl">
                    {heading}
                </h2>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 py-2 tracking-wider text-sm sm:text-base">
                    {body}
                </p>

                <div className="py-4 sm:py-6">
                    <ButtonComponent transparent={true} onClick={handleClick}>
                        Learn More
                    </ButtonComponent>
                </div>
            </div>
        </div>
    );
}

export default Card;