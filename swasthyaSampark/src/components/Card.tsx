import ButtonComponent from "./ButtonComponent.tsx";
import {useNavigate} from "react-router-dom";



const Card =({svg, heading, body})=>{
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate('/survey')
    }
    return <div className="flex">
        <div
            className="max-w-lg p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 static bottom-0 right-0 ">
            <div className="flex justify-end py-4">
                {svg}
            </div>

            <a href="#">
                <h2 className="h2 py-2">
                    {heading}
                </h2>
            </a>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 py-2 tracking-wider px-0">
                {body}
            </p>

            <div className="py-6 ">
                <ButtonComponent transparent={true} onClick={handleClick}>
                    Learn More
                </ButtonComponent>
            </div>

        </div>

    </div>
}

export default Card;