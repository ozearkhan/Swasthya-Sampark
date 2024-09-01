import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import axios from 'axios';
import Navbar from '../Navbar/NavBar.tsx';
import FallBackUi from '../Fallback/FallbackUi';
import SuccessMessage from '../FlashyMessage/SuccessMessage';
import Copyright from '../Copyright/Copyright';
import { BACKEND_URL } from '../services/api.ts';
import PatientLogin from './PatientLogin.js';

function ReportSummary() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showFlashy, setShowFlashy] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [resp, setResp] = useState('');
    const [showDisclaimer, setShowDisclaimer] = useState(true);

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

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const target = e.target as FileReader;
                if (target) {
                    setImage(target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
            if (fileInput && fileInput.files && fileInput.files[0]) {
                formData.append('uploaded_files', fileInput.files[0]);
                const serverRes = await axios.post(
                    `${BACKEND_URL}/api/image-to-text/textract`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
                const summaryData = await marked(serverRes.data.summaryData as string);
                setResp(summaryData);
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

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-100">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <PatientLogin onLoginSuccess={() => {
                        setIsAuthenticated(true);
                        setShowFlashy(true);
                    }} />
                </div>
                {/*<Copyright />*/}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar isPatient={true} isLogout={true} isDoctor={false} />
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
            <Copyright />
        </div>
    );
}

export default ReportSummary;
