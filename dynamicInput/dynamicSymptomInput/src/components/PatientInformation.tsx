// src/components/PatientInformation.jsx
// @ts-ignore
import React from 'react';
import { useRecoilState } from 'recoil';
import { patientInfoState } from '../atoms/symptomAtoms';

function PatientInformation({ onNext, onPrev }) {
    const [patientInfo, setPatientInfo] = useRecoilState(patientInfoState);

    const handleChange = (e) => {
        setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Patient Information</h2>
            <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={patientInfo.age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                    id="gender"
                    name="gender"
                    value={patientInfo.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="flex justify-between">
                <button onClick={onPrev} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
                <button onClick={onNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>
            </div>
        </div>
    );
}

export default PatientInformation;