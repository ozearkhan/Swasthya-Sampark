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
            <button onClick={onNext}
                    className="text-white bg-[#175134] hover:bg-[#0f3a24] font-medium rounded-lg text-base px-3 py-2 text-center dark:bg-[#175134] dark:hover:bg-[#0f3a24] dark:focus:ring-[#143c2d]"
            >
                Start Symptom Check
            </button>
        </div>
    );
}

export default Introduction;
