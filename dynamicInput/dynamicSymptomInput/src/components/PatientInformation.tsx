// components/PatientInformation.jsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { patientInfoState } from '../atoms/symptomAtoms';
import { Button, Label, TextInput, Select } from 'flowbite-react';

function PatientInformation({ onNext, onPrev }) {
    const [patientInfo, setPatientInfo] = useRecoilState(patientInfoState);

    const handleChange = (e) => {
        setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Patient Information</h2>
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
                <Select id="gender" name="gender" value={patientInfo.gender} onChange={handleChange} required>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </Select>
            </div>
            <div className="flex justify-between">
                <Button color="light" onClick={onPrev}>
                    Back
                </Button>
                <Button color="blue" onClick={onNext}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default PatientInformation;