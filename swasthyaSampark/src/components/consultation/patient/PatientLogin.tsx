import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {BACKEND_URL} from "../services/api.ts";
import DuplicateEmail from '../FlashyMessage/DuplicateEmail';
import PatientLogo from "../../../../public/icon/PatientLogo.tsx";

const PatientLogin = ({ onLoginSuccess }) => {
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const { data } = await axios.post(
                `${BACKEND_URL}/api/auth/generateTokenP`,
                { token: credentialResponse.credential }
            );
            if (data.token === 'tokenNotGranted') {
                setIsEmailDuplicate(true);
                return;
            }
            localStorage.setItem('token', data.token);
            onLoginSuccess();
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
                <div className="p-8 lg:w-1/2 flex flex-col justify-center">
                    <div className="text-center">
                        <PatientLogo />
                    </div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Patient Sign In</h2>
                    <p className="text-gray-600 text-center mb-6">Access your patient portal and manage your health information.</p>
                    <div className="flex justify-center mb-6">
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => console.log('Google Login Failed')}
                            theme="outline"
                            size="large"
                            shape="rectangular"
                        />
                    </div>
                    {isEmailDuplicate && (
                        <DuplicateEmail message="A Doctor Account with This Email Already Exists" />
                    )}
                </div>
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-[#175134] to-[#28a745] items-center justify-center">
                    <div className="text-white p-8 text-center">
                        <h4 className="mb-4 text-4xl font-bold">Your Health, Our Priority</h4>
                        <p className="text-lg">Swasthya Sampark utilizes AI for accurate health assessments, tailored reports, and convenient online consultations.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientLogin;
