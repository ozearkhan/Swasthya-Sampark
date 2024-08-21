import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { marked } from 'marked';
import axios from 'axios';
import Navbar from '../Navbar/NavBar.jsx';
import FallBackUi from '../Fallback/FallbackUi';
import SuccessMessage from '../FlashyMessage/SuccessMessage';
import DuplicateEmail from '../FlashyMessage/DuplicateEmail';
import Copyright from '../Copyright/Copyright';
import './UploadReports.css';

function UploadReports() {
    const { role = 'noRole' } = useLoaderData();
    const navigate = useNavigate();
    const [isPatient, setIsPatient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
    const [showFlashy, setShowFlashy] = useState(false);
    const [image, setImage] = useState(null);
    const [resp, setResp] = useState('');

    useEffect(() => {
        if (role === 'doctor') {
            navigate('/consultation/doctor');
        }
    }, [role, navigate]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            const fileInput = document.querySelector('input[type="file"]');
            formData.append('uploaded_files', fileInput.files[0]);
            const serverRes = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/image_to_text/textract`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            setResp(marked(serverRes.data.summaryData));
        } catch (err) {
            console.error('Error during file upload:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <FallBackUi />;
    }

    if (role === 'noRole' && !isPatient) {
        return (
            <div className="login-container">
                <Navbar isPatient={!isPatient} />
                <h1 className="login-heading">Sign in as Patient</h1>
                <div className="login-box">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            setIsLoading(true);
                            try {
                                const { data } = await axios.post(
                                    `${process.env.REACT_APP_BACKEND_URL}/api/auth/generateTokenP`,
                                    { token: credentialResponse.credential }
                                );
                                if (data.token === 'tokenNotGranted') {
                                    setIsEmailDuplicate(true);
                                    return;
                                }
                                localStorage.setItem('token', data.token);
                                setIsPatient(true);
                                setShowFlashy(true);
                            } catch (error) {
                                console.error('Login failed', error);
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        onError={() => console.log('Google Login Failed')}
                    />
                </div>
                {isEmailDuplicate && (
                    <DuplicateEmail message="A Doctor Account with This Email Already Exists" />
                )}
                <Copyright />
            </div>
        );
    }

    return (
        <div className="upload-container">
            <Navbar isPatient={true} isLogout={true} />
            {showFlashy && <SuccessMessage message="You're Now Logged in as a Patient" />}
            <h1 className="upload-heading">Upload Past Reports</h1>
            <form onSubmit={handleSubmit} className="upload-form">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                />
                <button type="submit" className="submit-button">
                    Upload and Analyze
                </button>
            </form>
            {image && (
                <div className="result-container">
                    <img src={image} alt="Uploaded Report" className="uploaded-image" />
                    <div
                        className="analysis-result"
                        dangerouslySetInnerHTML={{ __html: resp }}
                    />
                </div>
            )}
            <Copyright />
        </div>
    );
}

export default UploadReports;