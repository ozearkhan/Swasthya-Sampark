import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import BACKEND_URL from "../services/api.js";
import DuplicateEmail from '../FlashyMessage/DuplicateEmail';

const DoctorLogin = ({ onLoginSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

    const handleGoogleLogin = async (credentialResponse) => {
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                `${BACKEND_URL}/api/auth/generateTokenD`,
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign in as Doctor</h1>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log('Google Login Failed')}
                theme="outline"
                size="large"
                shape="rectangular"
            />
            {isEmailDuplicate && (
                <DuplicateEmail message="A Patient Account with This Email Already Exists" />
            )}
        </div>
    );
};

export default DoctorLogin;