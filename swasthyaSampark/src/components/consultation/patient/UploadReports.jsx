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
import BACKEND_URL from "../services/api.js";

function ReportSummary() {
    const { role = 'noRole' } = useLoaderData();
    const navigate = useNavigate();
    const [isPatient, setIsPatient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
    const [showFlashy, setShowFlashy] = useState(false);
    const [image, setImage] = useState(null);
    const [resp, setResp] = useState('');
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    useEffect(() => {
        if (role === 'doctor') {
            navigate('/consultation/doctor');
        }
    }, [role, navigate]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput.files[0]) {
                formData.append('uploaded_files', fileInput.files[0]);
                const serverRes = await axios.post(
                    `${BACKEND_URL}/api/image-to-text/textract`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
                setResp(marked(serverRes.data.summaryData));
            } else {
                throw new Error('No file selected');
            }
        } catch (err) {
            console.error('Error during file upload:', err);
            setResp('An error occurred while processing the image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <FallBackUi />;
    }

    if (role === 'noRole' && !isPatient) {
        return (
            <div className="min-h-screen flex flex-col items-center bg-gray-100">
                <Navbar isPatient={!isPatient} />
                <div className="w-full max-w-md mt-20 p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign in as Patient</h1>
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            setIsLoading(true);
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
                                setIsPatient(true);
                                setShowFlashy(true);
                            } catch (error) {
                                console.error('Login failed', error);
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        onError={() => console.log('Google Login Failed')}
                        theme="outline"
                        size="large"
                        shape="rectangular"
                    />
                    {isEmailDuplicate && (
                        <DuplicateEmail message="A Doctor Account with This Email Already Exists" />
                    )}
                </div>
                <Copyright className="mt-auto" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar isPatient={true} isLogout={true} />
            {showDisclaimer && (
                <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-3">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <p className="text-yellow-700 text-sm">
                            Our AI system uses Tesseract OCR, which may have inconsistencies with medical reports. We're working on a custom model for better accuracy.
                        </p>
                        <button
                            onClick={() => setShowDisclaimer(false)}
                            className="text-yellow-700 hover:text-yellow-900 focus:outline-none"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
            {showFlashy && <SuccessMessage message="You're Now Logged in as a Patient" />}
            <div className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">AI-Powered Report Summary Generation</h1>
                <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                    Our AI-powered system utilizes advanced OCR technology to analyze your uploaded reports and generate detailed summaries.
                </p>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-8">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file-upload">
                            Upload Report Image
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-300"
                    >
                        Upload and Generate Summary
                    </button>
                </form>
                {image && (
                    <div className="max-w-2xl mx-auto">
                        <img src={image} alt="Uploaded Report" className="w-full h-auto rounded-lg shadow-md mb-4" />
                        <div
                            className="bg-white border border-gray-300 rounded-lg shadow-md p-6 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: resp }}
                        />
                    </div>
                )}
            </div>
            <Copyright className="mt-auto" />
        </div>
    );
}

export default ReportSummary;