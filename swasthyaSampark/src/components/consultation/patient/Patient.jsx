import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Navbar from '../Navbar/NavBar.jsx';
import FallBackUi from '../Fallback/FallbackUi';
import SuccessMessage from '../FlashyMessage/SuccessMessage';
import DuplicateEmail from '../FlashyMessage/DuplicateEmail';
import Copyright from '../Copyright/Copyright';
import BACKEND_URL from '../services/api';
import PatientPhoto from '/thumbnails/patient.png';
import button_logo from '/button_logo/google_gif3.gif';
import './patient.css';

function Patient() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
    const [showFlashy, setShowFlashy] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleGoogleLogin = async (credentialResponse) => {
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/auth/generateTokenP`, {
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
        <div className="patient-page">
            <Navbar isPatient={isAuthenticated} isLogout={isAuthenticated} />
            {showFlashy && <SuccessMessage message="You're now logged in as a Patient" />}
            {isEmailDuplicate && (
                <DuplicateEmail message="A Doctor Account with This Email Already Exists" />
            )}
            <div className="patient-container">
                <h1 className="patient-title">
                    {isAuthenticated ? 'Patient Portal' : 'Patient Login'}
                </h1>
                {isAuthenticated ? (
                    <div className="patient-cards">
                        <Link to="/consultation/patient_request_consultation" className="patient-card">
                            <div className="patient-card-icon">📅</div>
                            <h2 className="patient-card-title">Request Consultation</h2>
                            <p className="patient-card-description">
                                Schedule a consultation with a doctor
                            </p>
                        </Link>
                        <Link to="/consultation/upload_reports" className="patient-card">
                            <div className="patient-card-icon">📁</div>
                            <h2 className="patient-card-title">Upload Past Reports</h2>
                            <p className="patient-card-description">
                                Upload and manage your medical reports
                            </p>
                        </Link>
                        <Link to="/consultation/chat_bot" className="patient-card">
                            <div className="patient-card-icon">🤖</div>
                            <h2 className="patient-card-title">AI Doctor</h2>
                            <p className="patient-card-description">
                                Get quick answers from our AI assistant
                            </p>
                        </Link>
                    </div>
                ) : (
                    <div className="login-container">
                        <div className="login-image-container">
                            <img
                                src={PatientPhoto}
                                alt="Patient"
                                className="login-image"
                            />
                        </div>
                        <div className="login-form">
                            <h2 className="login-title">Welcome, Patient</h2>
                            <p className="login-description">Sign in to access your patient portal</p>
                            <div className="google-button-container">
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => console.log('Login Failed')}
                                />
                            </div>
                            <img
                                src={button_logo}
                                alt="Google Login"
                                className="google-button-logo"
                            />
                        </div>
                    </div>
                )}
            </div>
            <Copyright />
        </div>
    );
}

export default Patient;