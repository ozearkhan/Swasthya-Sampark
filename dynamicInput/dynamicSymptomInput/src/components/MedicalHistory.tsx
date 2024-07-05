// src/components/MedicalHistory.jsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { medicalHistoryState } from '../atoms/symptomAtoms';

function MedicalHistory({ onNext, onPrev }) {
    const [medicalHistory, setMedicalHistory] = useRecoilState(medicalHistoryState);

    const conditions = [
        'Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Cancer', 'Arthritis'
    ];

    const handleToggle = (condition) => {
        setMedicalHistory(prev =>
            prev.includes(condition)
                ? prev.filter(c => c !== condition)
                : [...prev, condition]
        );
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Medical History</h2>
            <p>Please select any pre-existing conditions:</p>
            <div className="space-y-2">
                {conditions.map(condition => (
                    <label key={condition} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={medicalHistory.includes(condition)}
                            onChange={() => handleToggle(condition)}
                            className="form-checkbox"
                        />
                        <span>{condition}</span>
                    </label>
                ))}
            </div>
            <div className="flex justify-between">
                <button onClick={onPrev} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
                <button onClick={onNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>
            </div>
        </div>
    );
}

export default MedicalHistory;