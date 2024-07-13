// components/TermsOfService.jsx
import React, { useState } from 'react';
import { Button, Checkbox } from 'flowbite-react';

function TermsOfService({ onNext, onPrev }) {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
            <p className="text-gray-700">Please read and accept our terms of service before continuing.</p>
            <div className="h-40 overflow-y-auto border p-4 rounded-lg bg-gray-50">
                {/* Terms of service content goes here */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="accept" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                <label htmlFor="accept" className="text-sm text-gray-700">
                    I accept the terms of service
                </label>
            </div>
            <div className="flex justify-between">
                <Button color="light" onClick={onPrev}>
                    Back
                </Button>
                <Button color="blue" onClick={onNext} disabled={!accepted}>
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default TermsOfService;