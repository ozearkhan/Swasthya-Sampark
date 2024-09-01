import React, { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useRecoilState } from 'recoil';
import { clientIdState, collectedSymptomsState } from '../../atoms/symptomAtoms';
import { Search, Plus, ArrowLeft, ArrowRight, Bot } from 'lucide-react';

interface SymptomCheckerProps {
    onNext: () => void;
    onPrev: () => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onNext, onPrev }) => {
    const [symptom, setSymptom] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentOptions, setCurrentOptions] = useState<string[]>([]);
    const [question, setQuestion] = useState('');
    const [output, setOutput] = useState<string[]>([]);
    const [showReset, setShowReset] = useState(false);
    const { socket, submitSymptom, selectSymptoms, resetProcess } = useSocket();
    const [, setCollectedSymptoms] = useRecoilState(collectedSymptomsState);
    const [, setClientId] = useRecoilState(clientIdState);

    useEffect(() => {
        socket.on('registered', handleRegistered);
        socket.on('symptomProcessed', handleSymptomProcessed);
        socket.on('processComplete', handleProcessComplete);
        socket.on('error', handleError);

        return () => {
            socket.off('registered', handleRegistered);
            socket.off('symptomProcessed', handleSymptomProcessed);
            socket.off('processComplete', handleProcessComplete);
            socket.off('error', handleError);
        };
    }, [socket]);

    const handleRegistered = ({ clientId }: { clientId: string }) => {
        setClientId(clientId);
    };

    const handleSymptomProcessed = (result: any) => {
        setIsProcessing(false);
        setIsLoading(false);
        setCollectedSymptoms(result.collectedSymptoms);
        setOutput((prev) => [...prev, `Added symptom: ${result.addedSymptom.name}`]);

        if (result.expandedSymptoms.type === 'multiple_choice' || result.expandedSymptoms.type === 'yes_no') {
            setQuestion(result.expandedSymptoms.question);
            setCurrentOptions(result.expandedSymptoms.options || ['Yes', 'No', "Don't know"]);
        } else {
            setQuestion('');
            setCurrentOptions([]);
        }

        if (!result.shouldContinue) {
            setShowReset(true);
        }
    };

    const handleProcessComplete = (result: any) => {
        setIsLoading(false);
        setOutput((prev) => [...prev, `Process complete. Further symptoms likely: ${result.furtherSymptomsLikely}`]);
        setShowReset(true);
    };

    const handleError = (error: any) => {
        setIsProcessing(false);
        setIsLoading(false);
        setOutput((prev) => [...prev, `Error: ${error}`]);
    };

    const handleSubmitSymptom = async () => {
        if (isProcessing || symptom.trim() === '') return;
        setIsProcessing(true);
        setIsLoading(true);
        try {
            await submitSymptom(symptom);
            setSymptom('');
        } catch (error) {
            console.error('Error submitting symptom:', error);
            setIsLoading(false);
        }
    };

    const handleSubmitAnswers = async () => {
        const selectedSymptoms = currentOptions.filter((_, index) => {
            const optionElement = document.getElementById(`option-${index}`) as HTMLInputElement;
            return optionElement?.checked;
        });

        if (selectedSymptoms.length > 0) {
            setIsLoading(true);
            try {
                await selectSymptoms(selectedSymptoms);
            } catch (error) {
                console.error('Error selecting symptoms:', error);
                setIsLoading(false);
            }
        }
    };

    const handleResetProcess = async () => {
        await resetProcess();
        setSymptom('');
        setIsProcessing(false);
        setIsLoading(false);
        setCurrentOptions([]);
        setQuestion('');
        setOutput([]);
        setShowReset(false);
    };

    const LoadingSkeleton = () => (
        <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Symptom Checker</h2>

            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <>
                    {!question && (
                        <div className="mb-6">
                            <label htmlFor="symptomInput" className="block text-sm font-medium text-gray-700 mb-2">
                                Enter a symptom
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="symptom"
                                    id="symptomInput"
                                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="e.g. headache, fever"
                                    value={symptom}
                                    onChange={(e) => setSymptom(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                            <button
                                onClick={handleSubmitSymptom}
                                disabled={isProcessing}
                                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                <Plus className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                                Add Symptom
                            </button>
                        </div>
                    )}

                    {question && (
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">{question}</h3>
                            {currentOptions.map((option, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        id={`option-${index}`}
                                        name="symptom-option"
                                        type="radio"
                                        className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300"
                                    />
                                    <label htmlFor={`option-${index}`} className="ml-3 block text-sm font-medium text-gray-700">
                                        {option}
                                    </label>
                                </div>
                            ))}
                            <button
                                onClick={handleSubmitAnswers}
                                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                Submit Answer
                            </button>
                        </div>
                    )}

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis</h3>
                        <div className="text-sm text-gray-600 space-y-2">
                            {output.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </div>

                    {showReset && (
                        <button
                            onClick={handleResetProcess}
                            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Reset Symptom Check
                        </button>
                    )}
                </>
            )}

            <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
                <Bot className="h-5 w-5 mr-2" />
                Powered by advanced AI for accurate symptom analysis
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    onClick={onPrev}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                    <ArrowLeft className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                    Back
                </button>
                <button
                    onClick={() => {
                        onNext();
                        // Optional: Add code to pass collected symptoms to the next page if necessary
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                    Next
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default SymptomChecker;

