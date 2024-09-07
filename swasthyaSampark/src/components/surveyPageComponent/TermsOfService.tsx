import  { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TermsOfService = ({ onNext, onPrev }) => {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Service</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Please review and accept our terms before continuing
                    </h3>
                    <div className="text-sm text-black space-y-4 mb-6">
                        <p><strong>Not a Diagnosis:</strong> HealthAssist provides information for educational purposes only and is not a qualified medical opinion.</p>
                        <p><strong>Emergency Services:</strong> For any health emergency, immediately contact your local emergency services.</p>
                        <p><strong>Data Privacy:</strong> Your information is confidential and will not be used for identification purposes.</p>
                        <p><strong>Medical Advice:</strong> Always consult with a healthcare professional for personalized medical advice.</p>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="accept-terms"
                            name="accept-terms"
                            type="checkbox"
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                        />
                        <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
                            I have read and accept the terms of service
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={onPrev}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                    <ArrowLeft className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!accepted}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        accepted ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-300 cursor-not-allowed'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                >
                    Continue
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default TermsOfService;