import { useRecoilState } from 'recoil';
import { medicalHistoryState } from '../../atoms/symptomAtoms';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const MedicalHistory = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
    const [medicalHistory, setMedicalHistory] = useRecoilState(medicalHistoryState);

    const conditions = [
        'Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Cancer', 'Arthritis'
    ];

    const handleToggle = (condition: string) => {
        setMedicalHistory(prev =>
            prev.includes(condition)
                ? prev.filter(c => c !== condition)
                : [...prev, condition]
        );
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical History</h2>
            <p className="text-gray-600 mb-6">
                Your medical history helps us provide more accurate assessments. Please select any pre-existing conditions you have:
            </p>
            <div className="bg-white shadow overflow-hidden sm:rounded-md mb-8">
                <ul className="divide-y divide-gray-200">
                    {conditions.map(condition => (
                        <li key={condition}>
                            <div className="px-4 py-4 flex items-center sm:px-6">
                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div className="truncate">
                                        <div className="flex text-sm">
                                            <p className="font-medium text-emerald-600 truncate">{condition}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-5 flex-shrink-0">
                                    <button
                                        onClick={() => handleToggle(condition)}
                                        className={`${
                                            medicalHistory.includes(condition)
                                                ? 'bg-emerald-600 hover:bg-emerald-700'
                                                : 'bg-gray-200 hover:bg-gray-300'
                                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                                    >
                                        <span className="sr-only">Select {condition}</span>
                                        <span
                                            className={`${
                                                medicalHistory.includes(condition) ? 'translate-x-5' : 'translate-x-0'
                                            } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                        >
                                            <span
                                                className={`${
                                                    medicalHistory.includes(condition)
                                                        ? 'opacity-100 ease-in duration-200'
                                                        : 'opacity-0 ease-out duration-100'
                                                } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                                aria-hidden="true"
                                            >
                                                <CheckCircle className="h-3 w-3 text-emerald-600" />
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
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
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                    Next
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default MedicalHistory;
