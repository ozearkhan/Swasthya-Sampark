import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from "recoil";
import { clientIdState, collectedSymptomsState } from "../../atoms/symptomAtoms.ts";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, AlertCircle, Activity, Clipboard, Stethoscope } from 'lucide-react';
import { ML_URL } from "../consultation/services/api.ts";

interface Prediction {
    Disease: string;
    Chances: number;
    Specialist: string;
    Description: string;
}

function Results({ onPrev }) {
    // Remove `resetProcess` if not used
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const clientId = useRecoilValue(clientIdState);
    const collectedSymptoms = useRecoilValue(collectedSymptomsState);
    const navigate = useNavigate();

    const handleNewCheck = () => {
        navigate('/survey');
    }

    const handleConsultationClick = () => {
        navigate('/consultation');
    }

    useEffect(() => {
        const fetchPredictions = async () => {
            if (collectedSymptoms.length === 0) {
                setError("No symptoms collected");
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const formattedSymptoms = {
                    symptoms: collectedSymptoms.map(symptom => symptom.toLowerCase())
                };
                console.log(formattedSymptoms);
                const response = await axios.post(`${ML_URL}/predict`, formattedSymptoms);
                const sortedPredictions = response.data.sort((a, b) => b.Chances - a.Chances);
                setPredictions(sortedPredictions);
            } catch (error) {
                console.error('Error fetching predictions:', error);
                setError("Failed to fetch predictions. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPredictions();
    }, [clientId, collectedSymptoms]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-6 bg-red-100 rounded-lg">
                <AlertCircle className="mx-auto mb-4 h-12 w-12" />
                <p className="text-lg font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Symptom Analysis Results</h2>

            <div className="bg-blue-50 rounded-lg p-6 mb-8 flex items-start">
                <Stethoscope className="w-16 h-16 text-blue-500 mr-4" />
                <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Online Doctor Consultation</h3>
                    <p className="text-blue-600 mb-4">
                        Based on your symptoms, we recommend scheduling an online consultation with a qualified medical professional for a proper diagnosis and personalized treatment plan.
                    </p>
                    <button
                        onClick={handleConsultationClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    >
                        Schedule Consultation
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Clipboard className="w-6 h-6 mr-2 text-gray-600" />
                    Collected Symptoms
                </h3>
                <ul className="list-disc list-inside space-y-2">
                    {collectedSymptoms.map((symptom, index) => (
                        <li key={index} className="text-gray-700">{symptom}</li>
                    ))}
                </ul>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Activity className="w-6 h-6 mr-2 text-gray-600" />
                    Potential Conditions
                </h3>
                {predictions.map((prediction, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{prediction.Disease}</h3>
                        <div className="flex items-center mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                                <div
                                    className="bg-green-500 h-3 rounded-full"
                                    style={{ width: `${prediction.Chances}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 min-w-[50px]">{prediction.Chances.toFixed(1)}%</span>
                        </div>
                        <p className="text-md text-gray-700 mb-2"><span className="font-semibold">Specialist:</span> {prediction.Specialist}</p>
                        <p className="text-sm text-gray-600">{prediction.Description}</p>
                    </div>
                ))}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Please note that this information is for educational purposes only and does not constitute professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-4 mt-8">
                <button
                    onClick={onPrev}
                    className="flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Previous
                </button>
                <button
                    onClick={handleNewCheck}
                    className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out"
                >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Start New Check
                </button>
            </div>
        </div>
    );
}

export default Results;
