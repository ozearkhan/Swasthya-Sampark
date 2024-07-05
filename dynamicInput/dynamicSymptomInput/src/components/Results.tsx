// src/components/Results.jsx
import React from 'react';
import { useSocket } from '../hooks/useSocket.ts';

function Results({ onPrev }) {
    const { symptomData, resetProcess } = useSocket();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Results</h2>
            {symptomData && (
                <div>
                    <p className="text-lg">Collected symptoms: {symptomData.collectedSymptoms.join(', ')}</p>
                    <p className="text-lg">Further symptoms likely: {symptomData.furtherSymptomsLikely ? 'Yes' : 'No'}</p>
                    {/* Add more result information as needed */}
                </div>
            )}
            <div className="flex justify-between">
                <button
                    onClick={onPrev}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    aria-label="Go to previous step"
                >
                    Previous
                </button>
                <button
                    onClick={resetProcess}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="Start a new symptom check"
                >
                    Start New Check
                </button>
            </div>
        </div>
    );
}

export default Results;