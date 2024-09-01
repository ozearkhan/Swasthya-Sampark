import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/NavBar.tsx';
import FallBackUi from '../Fallback/FallbackUi';
import SuccessMessage from '../FlashyMessage/SuccessMessage';
import Copyright from '../Copyright/Copyright';
import {BACKEND_URL} from "../services/api.ts";
import PatientLogin from './PatientLogin';
import './patient.css';

function Patient() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showFlashy, setShowFlashy] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.post(`${BACKEND_URL}/api/auth/verify`, { token });
                    if (response.data.role === 'patient') {
                        setIsAuthenticated(true);
                    } else {
                        navigate('/consultation');
                    }
                } catch (error) {
                    console.error('Token verification failed:', error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };

        verifyToken();
    }, [navigate]);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setShowFlashy(true);
    };

    if (isLoading) {
        return <FallBackUi />;
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center bg-gray-100">
                <Navbar isDoctor={false} isLogout={false} isPatient={false}/>
                <PatientLogin onLoginSuccess={handleLoginSuccess} />
                {/*<Copyright className="mt-auto" />*/}
            </div>
        );
    }

    return (
        <div className="patient-page">
            <Navbar isPatient={true} isLogout={true} isDoctor={false}/>
            {showFlashy && <SuccessMessage message="You're now logged in as a Patient" />}
            <div className="patient-container">
                <h1 className="patient-title">Patient Portal</h1>
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
                        <h2 className="patient-card-title">Report Summary Generation</h2>
                        <p className="patient-card-description">
                            Upload and generate your medical report summary
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
            </div>
            <Copyright />
        </div>
    );
}

export default Patient;