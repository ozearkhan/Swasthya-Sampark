// components/MedicalHistory.jsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { medicalHistoryState } from '../atoms/symptomAtoms';
import { Button, Checkbox } from 'flowbite-react';

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
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>
            <p className="text-gray-700">Please select any pre-existing conditions:</p>
            <div className="space-y-4">
                {conditions.map(condition => (
                    <div key={condition} className="flex items-center">
                        <Checkbox
                            id={condition}
                            checked={medicalHistory.includes(condition)}
                            onChange={() => handleToggle(condition)}
                        />
                        <label htmlFor={condition} className="ml-2 text-sm text-gray-700">
                            {condition}
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <Button color="light" onClick={onPrev}>
                    Back
                </Button>
                <Button color="blue" onClick={onNext}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default MedicalHistory;