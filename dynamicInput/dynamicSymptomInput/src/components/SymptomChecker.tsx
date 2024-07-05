import React, { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';

function SymptomChecker({ onComplete }) {
    const [symptom, setSymptom] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentOptions, setCurrentOptions] = useState([]);
    const [question, setQuestion] = useState('');
    const [output, setOutput] = useState([]);
    const [showReset, setShowReset] = useState(false);
    const { socket, submitSymptom, selectSymptoms, resetProcess } = useSocket();

    useEffect(() => {
        socket.on('symptomProcessed', handleSymptomProcessed);
        socket.on('processComplete', handleProcessComplete);
        socket.on('error', handleError);

        return () => {
            socket.off('symptomProcessed', handleSymptomProcessed);
            socket.off('processComplete', handleProcessComplete);
            socket.off('error', handleError);
        };
    }, [socket]);

    const handleSymptomProcessed = (result) => {
        setIsProcessing(false);
        setOutput(prev => [...prev,
            `Added symptom: ${result.addedSymptom.name}`,
            `Collected symptoms: ${result.collectedSymptoms.join(', ')}`,
            `Iteration: ${result.currentIteration}`
        ]);

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

    const handleProcessComplete = (result) => {
        setOutput(prev => [...prev, `Process complete. Further symptoms likely: ${result.furtherSymptomsLikely}`]);
        setShowReset(true);
        onComplete(result);
    };

    const handleError = (error) => {
        setIsProcessing(false);
        setOutput(prev => [...prev, `Error: ${error}`]);
    };

    const handleSubmitSymptom = async () => {
        if (isProcessing || symptom.trim() === '') return;
        setIsProcessing(true);
        try {
            await submitSymptom(symptom);
            setSymptom('');
        } catch (error) {
            console.error('Error submitting symptom:', error);
        }
    };

    const handleSubmitAnswers = async () => {
        const selectedSymptoms = currentOptions.filter((_, index) =>
            document.getElementById(`option-${index}`).checked
        );
        if (selectedSymptoms.length > 0) {
            try {
                await selectSymptoms(selectedSymptoms);
            } catch (error) {
                console.error('Error selecting symptoms:', error);
            }
        }
    };

    const handleResetProcess = async () => {
        await resetProcess();
        setSymptom('');
        setIsProcessing(false);
        setCurrentOptions([]);
        setQuestion('');
        setOutput([]);
        setShowReset(false);
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Symptom Checker</h2>
            {!question && (
                <div className="mb-4">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="symptomInput"
                        type="text"
                        placeholder="Enter a symptom"
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                        disabled={isProcessing}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                        onClick={handleSubmitSymptom}
                        disabled={isProcessing}
                    >
                        Submit
                    </button>
                </div>
            )}
            {question && (
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{question}</h3>
                    {currentOptions.map((option, index) => (
                        <div key={index} className="mb-2">
                            <input
                                type={currentOptions.length > 2 ? "checkbox" : "radio"}
                                id={`option-${index}`}
                                name="symptom"
                                value={option}
                                className="mr-2"
                            />
                            <label htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    ))}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                        onClick={handleSubmitAnswers}
                    >
                        Next
                    </button>
                </div>
            )}
            <div className="mt-4">
                {output.map((line, index) => (
                    <p key={index} className="text-gray-700">{line}</p>
                ))}
            </div>
            {showReset && (
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    onClick={handleResetProcess}
                >
                    Start Over
                </button>
            )}
        </div>
    );
}

export default SymptomChecker;