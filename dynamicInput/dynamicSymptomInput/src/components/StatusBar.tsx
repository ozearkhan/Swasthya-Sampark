import React from "react";

function StatusBar({ currentStep, totalSteps }) {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="status-bar">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <p>Step {currentStep + 1} of {totalSteps}</p>
        </div>
    );
}

export default StatusBar;