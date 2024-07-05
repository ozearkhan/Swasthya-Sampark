// src/components/TermsOfService.jsx
import React, { useState } from 'react';

function TermsOfService({ onNext, onPrev }) {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Terms of Service</h2>
            <p>Please read and accept our terms of service before continuing.</p>
            <div className="terms-content h-40 overflow-y-auto border p-2">
                {/* Terms of service content goes here */}
            </div>
            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="form-checkbox"
                />
                <span>I accept the terms of service</span>
            </label>
            <div className="flex justify-between">
                <button
                    onClick={onPrev}
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!accepted}
                    className={`${accepted ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default TermsOfService;