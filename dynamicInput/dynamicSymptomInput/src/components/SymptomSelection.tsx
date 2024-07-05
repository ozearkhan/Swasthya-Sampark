import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedSymptomsState } from '../atoms/symptomAtoms';
import { useSocket } from '../hooks/useSocket.ts';

function SymptomSelection({ onNext, onPrev }) {
    const [symptom, setSymptom] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useRecoilState(selectedSymptomsState);
    const { submitSymptom, loading, error } = useSocket();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (symptom.trim()) {
            try {
                const result = await submitSymptom(symptom);
                setSelectedSymptoms((prev) => [...prev, result.addedSymptom.name]);
                setSymptom('');
            } catch (err) {
                console.error('Error submitting symptom:', err);
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Select Your Symptoms</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex">
                    <input
                        type="text"
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                        placeholder="Enter a symptom"
                        className="flex-grow px-3 py-2 border rounded-l"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                    >
                        {loading ? 'Adding...' : 'Add'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="mb-4">
                {selectedSymptoms.map((s, index) => (
                    <li key={index} className="mb-2 p-2 bg-gray-100 rounded">{s}</li>
                ))}
            </ul>
            <div className="flex justify-between">
                <button
                    onClick={onPrev}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={selectedSymptoms.length === 0}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${selectedSymptoms.length === 0 && 'opacity-50 cursor-not-allowed'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default SymptomSelection;