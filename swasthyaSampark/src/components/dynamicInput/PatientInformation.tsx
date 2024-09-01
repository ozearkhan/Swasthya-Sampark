import { useRecoilState } from 'recoil';
import { patientInfoState } from '../../atoms/symptomAtoms';
import { ArrowLeft, ArrowRight, Plus, Minus, User } from 'lucide-react';

const PatientInformation = ({ onNext, onPrev }) => {
    const [patientInfo, setPatientInfo] = useRecoilState(patientInfoState);

    const handleChange = (field, value) => {
        setPatientInfo({ ...patientInfo, [field]: value });
    };

    const adjustAge = (amount) => {
        const newAge = Math.max(0, Math.min(120, (parseInt(patientInfo.age) || 0) + amount));
        handleChange('age', newAge.toString());
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Information</h2>
            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <div className="flex items-center w-44">
                        <button
                            onClick={() => adjustAge(-1)}
                            className="p-2 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                        >
                            <Minus className="h-5 w-5" />
                        </button>
                        <input
                            type="number"
                            name="age"
                            value={patientInfo.age}
                            onChange={(e) => handleChange('age', e.target.value)}
                            className="block w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 text-center"
                            min="0"
                            max="120"
                        />
                        <button
                            onClick={() => adjustAge(1)}
                            className="p-2 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <div className="flex justify-center space-x-4">
                        {['male', 'female', 'other'].map((gender) => (
                            <button
                                key={gender}
                                onClick={() => handleChange('gender', gender)}
                                className={`flex items-center justify-center p-2 rounded-md transition-all w-24 ${
                                    patientInfo.gender === gender
                                        ? 'bg-emerald-100 ring-2 ring-emerald-500 text-emerald-700'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                            >
                                <GenderIcon gender={gender} />
                                <span className="ml-2 capitalize">{gender}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-between">
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

const GenderIcon = ({ gender }) => {
    const size = 20;

    switch (gender) {
        case 'male':
            return <span className="text-xl">♂</span>;
        case 'female':
            return <span className="text-xl">♀</span>;
        default:
            return <User size={size} />;
    }
};

export default PatientInformation;