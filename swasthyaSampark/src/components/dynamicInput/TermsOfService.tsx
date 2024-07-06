// components/TermsOfService.jsx
import React, { useState } from 'react';
import { Button, Checkbox } from 'flowbite-react';

function TermsOfService({ onNext, onPrev }) {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
            <p className="text-gray-700">Please read and accept our terms of service before continuing.</p>
            <div className="h-40 text-black overflow-y-auto border p-4 rounded-lg bg-gray-50">
                {/* Terms of service content goes here */}

                Checkup isn’t a diagnosis.<br/> It’s only for your information and not a qualified medical opinion.<br/>
                Checkup isn’t for emergencies.<br/> Call your local emergency number right away when there’s a health
                emergency.<br/>
                Your data is safe.<br/> The information you give won’t be shared or used to identify you.<br/>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="accept" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                <label htmlFor="accept" className="text-sm text-gray-700">
                    I accept the terms of service
                </label>
            </div>
            <div className="flex justify-between">
                <button onClick={onPrev}
                                            className="text-white bg-[#175134] hover:bg-[#0f3a24] font-medium rounded-lg text-base px-3 py-2 text-center dark:bg-[#175134] dark:hover:bg-[#0f3a24] dark:focus:ring-[#143c2d]"

                >
                    Back
                </button>
                <button onClick={onNext} disabled={!accepted}
                                            className="text-white bg-[#175134] hover:bg-[#0f3a24] font-medium rounded-lg text-base px-3 py-2 text-center dark:bg-[#175134] dark:hover:bg-[#0f3a24] dark:focus:ring-[#143c2d]"

                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default TermsOfService;