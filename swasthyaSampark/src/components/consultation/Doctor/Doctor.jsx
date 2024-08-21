import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Navbar from '../Navbar/NavBar.jsx';
import FallBackUi from '../Fallback/FallbackUi';
import SuccessMessage from '../FlashyMessage/SuccessMessage';
import DuplicateEmail from '../FlashyMessage/DuplicateEmail';
import Copyright from '../Copyright/Copyright';
import BACKEND_URL from '../services/api';
import './doctor.css';

function Doctor() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
    const [showFlashy, setShowFlashy] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is already authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleGoogleLogin = async (credentialResponse) => {
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/auth/generateTokenD`, {
                token: credentialResponse.credential,
            });
            if (data.token === 'tokenNotGranted') {
                setIsEmailDuplicate(true);
            } else {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                setShowFlashy(true);
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <FallBackUi />;

    return (
        <>
            <Navbar isDoctor={isAuthenticated} isLogout={isAuthenticated} />
            {showFlashy && <SuccessMessage message="You're now logged in as a Doctor" />}
            {isEmailDuplicate && (
                <DuplicateEmail message="A Patient Account with This Email Already Exists" />
            )}
            <div className="doctor-portal">
                <h1 className="doctor-portal__title">
                    {isAuthenticated ? 'Doctor Portal' : 'Sign in as Doctor'}
                </h1>
                {isAuthenticated ? (
                    <div className="doctor-portal__cards">
                        <Link to="/consultation/doctor/schedule" className="doctor-portal__card">
                            <div className="doctor-portal__card-icon">📅</div>
                            <h2 className="doctor-portal__card-title">Schedule Consultation</h2>
                            <p className="doctor-portal__card-description">
                                Manage your consultation schedule
                            </p>
                        </Link>
                        <Link to="/consultation/doctor_data_visualization" className="doctor-portal__card">
                            <div className="doctor-portal__card-icon">📊</div>
                            <h2 className="doctor-portal__card-title">Patient Data Visualization</h2>
                            <p className="doctor-portal__card-description">
                                View and analyze patient data
                            </p>
                        </Link>
                    </div>
                ) : (
                    <div className="doctor-portal__cards">
                        <div className="doctor-portal__card">
                            <div className="doctor-portal__card-icon">👨‍⚕️</div>
                            <h2 className="doctor-portal__card-title">Doctor Login</h2>
                            <p className="doctor-portal__card-description">
                                Sign in with your Google account
                            </p>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => console.log('Login Failed')}
                            />
                        </div>
                    </div>
                )}
            </div>
            <Copyright />
        </>
    );
}

export default Doctor;