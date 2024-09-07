import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ChevronRight } from 'lucide-react';
import ErrorBoundary from '../components/surveyPageComponent/ErrorBoundary';
import Introduction from '../components/surveyPageComponent/Introduction';
import TermsOfService from '../components/surveyPageComponent/TermsOfService';
import PatientInformation from '../components/surveyPageComponent/PatientInformation';
import MedicalHistory from '../components/surveyPageComponent/MedicalHistory';
import SymptomChecker from '../components/surveyPageComponent/SymptomChecker';
import Results from '../components/surveyPageComponent/Results';

const steps = [
    { component: Introduction, label: 'Introduction' },
    { component: TermsOfService, label: 'Terms of Service' },
    { component: PatientInformation, label: 'Patient Information' },
    { component: MedicalHistory, label: 'Medical History' },
    { component: SymptomChecker, label: 'Symptom Checker' },
    { component: Results, label: 'Results' },
];

function SurveyPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [results, setResults] = useState(null);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const handleComplete = (result) => {
        setResults(result);
        nextStep();
    };

    const CurrentComponent = steps[currentStep].component;

    return (
        <RecoilRoot>
            <ErrorBoundary>
                <div className="relative min-h-screen w-full">
                    <div className="absolute inset-0 bg-transparent z-0"></div>
                    <div className="relative z-10 min-h-screen flex flex-col py-8 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                            <div className="p-8">
                                <nav className="mb-8 pb-5">
                                    <ol className="flex items-center justify-between">
                                        {steps.map((step, index) => (
                                            <li key={step.label} className="flex items-center">
                                                <div className={`flex flex-col items-center ${index === currentStep ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                                                    <span className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${index <= currentStep ? 'border-[#175134] bg-[#175134] text-white' : 'border-gray-200 bg-gray-200'}`}>
                                                        {index + 1}
                                                    </span>
                                                    <span className="mt-2 text-xs sm:text-sm text-center text-gray-700">
                                                        {step.label}
                                                    </span>
                                                </div>
                                                {index < steps.length - 1 && (
                                                    <ChevronRight className="w-5 h-5 mx-2 text-gray-300" />
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </nav>

                                {/* Conditionally pass props based on the component */}
                                <CurrentComponent
                                    onNext={nextStep}
                                    onPrev={prevStep}
                                    {...(currentStep === 4 && { onComplete: handleComplete })}
                                    {...(currentStep === 5 && { results })}
                                />
                            </div>
                            <footer className="bg-gray-800 text-white py-4 text-center text-xs">
                                <p>&copy; 2024 Swasthya Sampark. All rights reserved.</p>
                                <p className="mt-1">Disclaimer: This tool is for informational purposes only and does not constitute medical advice.</p>
                            </footer>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </RecoilRoot>
    );
}

export default SurveyPage;
