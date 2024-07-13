import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from '../components/dynamicInput/ErrorBoundary';
import Introduction from '../components/dynamicInput/Introduction';
import TermsOfService from '../components/dynamicInput/TermsOfService';
import PatientInformation from '../components/dynamicInput/PatientInformation';
import MedicalHistory from '../components/dynamicInput/MedicalHistory';
import SymptomChecker from '../components/dynamicInput/SymptomChecker';
import Results from '../components/dynamicInput/Results';
import StatusBar from '../components/dynamicInput/StatusBar';

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
                <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                        <StatusBar currentStep={currentStep} totalSteps={steps.length} />
                        <CurrentComponent
                            onNext={nextStep}
                            onPrev={prevStep}
                            onComplete={handleComplete}
                            results={results}
                        />
                    </div>
                </div>
            </ErrorBoundary>
        </RecoilRoot>
    );
}

export default SurveyPage;
