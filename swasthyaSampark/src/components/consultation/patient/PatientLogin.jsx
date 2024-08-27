import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import BACKEND_URL from "../services/api.js";
import DuplicateEmail from '../FlashyMessage/DuplicateEmail';

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
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
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
    );
};

export default PatientLogin;