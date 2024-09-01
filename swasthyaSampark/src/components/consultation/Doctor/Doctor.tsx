import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/NavBar.tsx';
import FallBackUi from '../Fallback/FallbackUi.js';
import SuccessMessage from '../FlashyMessage/SuccessMessage.js';
import Copyright from '../Copyright/Copyright';
import {BACKEND_URL} from "../services/api.ts";
import DoctorLogin from './DoctorLogin';

function Doctor() {
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
                    if (response.data.role === 'doctor') {
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
                <DoctorLogin onLoginSuccess={handleLoginSuccess} />
                {/*<Copyright className="mt-auto" />*/}
            </div>
        );
    }

    return (
        <div className="doctor-wrapper">
            <Navbar isDoctor={true} isLogout={true} isPatient={false}/>
            {showFlashy && <SuccessMessage message="You're now logged in as a Doctor" />}
            <div className="doctor-portal">
                <h1 className="doctor-portal__title">Doctor Portal</h1>
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
            </div>
            <Copyright />
        </div>
    );
}

export default Doctor;