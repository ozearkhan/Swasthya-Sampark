// components/SymptomChecker.jsx
import React, { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { Button, TextInput, Radio } from 'flowbite-react';

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
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Symptom Checker</h2>
            {!question && (
                <div className="space-y-4">
                    <TextInput
                        id="symptomInput"
                        type="text"
                        placeholder="Enter a symptom"
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                        disabled={isProcessing}
                    />
                    <Button color="blue" onClick={handleSubmitSymptom} disabled={isProcessing}>
                        Submit
                    </Button>
                </div>
            )}
            {question && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">{question}</h3>
                    {currentOptions.map((option, index) => (
                        <div key={index} className="flex items-center">
                            <Radio
                                id={`option-${index}`}
                                name="symptom"
                                value={option}
                            />
                            <label htmlFor={`option-${index}`} className="ml-2 text-sm text-gray-700">
                                {option}
                            </label>
                        </div>
                    ))}
                    <Button color="blue" onClick={handleSubmitAnswers}>
                        Next
                    </Button>
                </div>
            )}
            <div className="mt-4 space-y-2">
                {output.map((line, index) => (
                    <p key={index} className="text-sm text-gray-700">{line}</p>
                ))}
            </div>
            {showReset && (
                <Button color="red" onClick={handleResetProcess}>
                    Start Over
                </Button>
            )}
        </div>
    );
}

export default SymptomChecker;