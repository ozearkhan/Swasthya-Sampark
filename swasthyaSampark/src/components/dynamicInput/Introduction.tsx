import { ArrowRight } from 'lucide-react';

const Introduction = ({ onNext }) => {
    return (
        <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 ">
                <svg className="w-24 h-24 mx-auto text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Check your symptoms</h1>
            <p className="text-lg text-gray-600 mb-8">
                Our advanced symptom checker uses AI to help you understand your health concerns.
                Get insights based on your symptoms and receive guidance on potential next steps.
            </p>
            <button
                onClick={onNext}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
                Start Your Health Assessment
                <ArrowRight className="ml-2 -mr-1 h-5 w-5 " aria-hidden="true" />
            </button>
        </div>
    );
};

export default Introduction;