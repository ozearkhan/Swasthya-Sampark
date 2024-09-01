// components/StatusBar.jsx
import { Progress } from 'flowbite-react';

function StatusBar({ currentStep, totalSteps }) {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="space-y-2">
            <Progress progress={progress} />
            <p className="text-sm text-gray-600 text-center">
                Step {currentStep + 1} of {totalSteps}
            </p>
        </div>
    );
}

export default StatusBar;