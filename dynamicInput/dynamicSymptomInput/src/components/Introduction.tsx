// src/components/Introduction.jsx
import React from 'react';

function Introduction({ onNext }) {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Welcome to the Symptom Checker</h1>
            <p>This tool will help you identify potential health issues based on your symptoms.</p>
            <button
                onClick={onNext}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                aria-label="Start symptom check"
            >
                Start
            </button>
        </div>
    );
}

export default Introduction;