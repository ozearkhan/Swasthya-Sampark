// src/components/DetailedSymptomQuestions.jsx
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedSymptomsState, resultsState } from '../atoms/symptomAtoms';
import { useSocket } from '../hooks/useSocket.ts';

function DetailedSymptomQuestions({ onNext, onPrev }) {
    const selectedSymptoms = useRecoilValue(selectedSymptomsState);
    const setResults = useSetRecoilState(resultsState);
    const { selectSymptoms, loading, error } = useSocket();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (selectedSymptoms.length > 0) {
            selectSymptoms(selectedSymptoms).then(setCurrentQuestion);
        }
    }, [selectedSymptoms]);

    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]);
        selectSymptoms([...selectedSymptoms, answer]).then(result => {
            if (result.shouldContinue) {
                setCurrentQuestion(result.expandedSymptoms);
            } else {
                setResults(result);
                onNext();
            }
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentQuestion) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Detailed Symptoms</h2>
            <p>{currentQuestion.question}</p>
            <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="w-full text-left p-2 border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="flex justify-between">
                <button onClick={onPrev} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
            </div>
        </div>
    );
}

export default DetailedSymptomQuestions;