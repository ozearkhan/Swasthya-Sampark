// components/Introduction.jsx
import React from 'react';
import { Button } from 'flowbite-react';

function Introduction({ onNext }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to the Symptom Checker</h1>
            <p className="text-lg text-gray-900">
                This tool will help you identify potential health issues based on your symptoms.
            </p>
            <Button onClick={onNext} color="blue">
                Start Symptom Check
            </Button>
        </div>
    );
}

export default Introduction;
