// components/PatientInformation.jsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { patientInfoState } from '../../atoms/symptomAtoms';
import { Button, Label, TextInput, Select } from 'flowbite-react';

function PatientInformation({ onNext, onPrev }) {
    const [patientInfo, setPatientInfo] = useRecoilState(patientInfoState);

    const handleChange = (e) => {
        setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-950">Patient Information</h2>
            <div>
                <Label htmlFor="age" value="Age" />
                <TextInput
                    id="age"
                    name="age"
                    type="number"
                    value={patientInfo.age}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="gender" value="Gender" />
                <Select id="gender" name="gender" value={patientInfo.gender} onChange={handleChange} required className="text-black">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </Select>
            </div>
            <div className="flex justify-between">
                <button onClick={onPrev}
                        className="text-white bg-[#175134] hover:bg-[#0f3a24] font-medium rounded-lg text-base px-3 py-2 text-center dark:bg-[#175134] dark:hover:bg-[#0f3a24] dark:focus:ring-[#143c2d]"

                >

                    Back
                </button>
                <button onClick={onNext}
                        className="text-white bg-[#175134] hover:bg-[#0f3a24] font-medium rounded-lg text-base px-3 py-2 text-center dark:bg-[#175134] dark:hover:bg-[#0f3a24] dark:focus:ring-[#143c2d]"

                >

                    Next
                </button>
            </div>
        </div>
    );
}

export default PatientInformation;