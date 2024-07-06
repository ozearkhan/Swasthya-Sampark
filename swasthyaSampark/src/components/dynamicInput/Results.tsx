// components/Results.jsx
import React, { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import axios from 'axios';
import {useRecoilValue} from "recoil";
import {clientIdState} from "../../atoms/symptomAtoms.ts";
import {useNavigate} from "react-router-dom";

function Results({ onPrev }) {
    const { resetProcess } = useSocket();
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const clientId = useRecoilValue(clientIdState);
    const navigate = useNavigate();

    const handleNewCheck = ()=>{
        navigate('/survey');
    }

    useEffect(() => {

            const fetchPredictions = async () => {
                if(!clientId) {
                    setError("Client ID missing");
                    return;
                }

                setIsLoading(true);
                setError(null);
                try {
                    const symptomResponse = await axios.get(`http://localhost:8080/api/symptoms/client/${clientId}`);
                    const symptoms = symptomResponse.data;
                    const formattedSymptoms = {symptoms: symptoms.map(s=>s.name)};

                    const response = await axios.post('http://127.0.0.1:8000/predict', formattedSymptoms);
                    console.log(response);
                    setPredictions(response.data);
                } catch (error) {
                    console.error('Error fetching predictions:', error);
                    setError("Failed to fetch predictions. Please try again.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPredictions();

    }, [clientId]);

    if (isLoading) {
        return <div className="text-center">Loading predictions...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="space-y-6 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Results</h2>

            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Consulting a Doctor</h3>
                <p className="text-blue-600">
                    Based on your symptoms, it's recommended to consult with a medical professional for a proper diagnosis and treatment plan.
                </p>
            </div>

            <div className="space-y-6">
                {predictions.map((prediction, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{prediction.Disease}</h3>
                        <div className="flex items-center mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${prediction.Chances}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500">{prediction.Chances.toFixed(1)}%</span>
                        </div>
                        <p className="text-md text-gray-600 mb-2"><span className="font-semibold">Specialist:</span> {prediction.Specialist}</p>
                        <p className="text-sm text-gray-500">{prediction.Description}</p>
                    </div>
                ))}
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-8">
                <p className="text-sm text-yellow-700">
                    Please note that the information from this tool is only for educational purposes and isn't a qualified medical opinion. This information shouldn't be considered a doctor's or other medical professional's advice or opinion about your actual health. You should get help for your symptoms from a doctor or other medical professional. If you're having a health emergency, you should call the local emergency number right away for help.
                </p>
            </div>

            <div className="flex justify-between gap-2 mt-8">
                <button onClick={onPrev}
                        className="text-white bg-[#175134] hover:bg-[#0f3a24] font-medium rounded-lg text-base px-6 py-3 text-center transition duration-300 ease-in-out">
                    Previous
                </button>
                <button onClick={resetProcess}
                        className="text-white bg-[#175134] hover:bg-[#0f3a24] font-medium rounded-lg text-base px-6 py-3 text-center transition duration-300 ease-in-out">
                    Start New Check
                </button>
            </div>
        </div>
    );
}

export default Results;