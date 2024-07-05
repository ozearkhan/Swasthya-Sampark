// components/Results.jsx
import React from 'react';
import { useSocket } from '../hooks/useSocket';
import { Button } from 'flowbite-react';

function Results({ onPrev }) {
    const { symptomData, resetProcess } = useSocket();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Results</h2>
            {symptomData && (
                <div className="space-y-4">
                    <p className="text-lg text-gray-700">
                        Collected symptoms: {symptomData.collectedSymptoms.join(', ')}
                    </p>
                    <p className="text-lg text-gray-700">
                        Further symptoms likely: {symptomData.furtherSymptomsLikely ? 'Yes' : 'No'}
                    </p>
                    {/* Add more result information as needed */}
                </div>
            )}
            <div className="flex justify-between">
                <Button color="light" onClick={onPrev}>
                    Previous
                </Button>
                <Button color="blue" onClick={resetProcess}>
                    Start New Check
                </Button>
            </div>
        </div>
    );
}

export default Results;