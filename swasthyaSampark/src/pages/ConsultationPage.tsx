import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/consultation/Navbar/NavBar.tsx';
import '../CSS/ConsultationPage.css'

const ConsultationPage: React.FC = () => {
    return (
        <div className="consultation-page">
            <Navbar isPatient={true} isDoctor={true} isLogout={false} />
            <main className="main-content">
                <h1 className="main-title">Welcome to Our Consultation Platform</h1>
                <p className="main-description">Choose your role or get assistance from our AI.</p>
                <div className="card-container">
                    <FeatureCard
                        icon="👤"
                        title="Patient Portal"
                        description="Access your health records and appointments."
                        linkTo="/consultation/patient"
                    />
                    <FeatureCard
                        icon="👨‍⚕️"
                        title="Doctor Login"
                        description="Manage patients and consultations."
                        linkTo="/consultation/doctor"
                    />
                    <FeatureCard
                        icon="🤖"
                        title="AI Assistant"
                        description="Get quick answers to health queries."
                        linkTo="/consultation/chat_bot"
                    />
                </div>
            </main>
        </div>
    );
};

const FeatureCard: React.FC<{
    icon: string;
    title: string;
    description: string;
    linkTo: string;
}> = ({ icon, title, description, linkTo }) => {
    return (
        <Link to={linkTo} className="feature-card">
            <div className="card-icon">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{description}</p>
        </Link>
    );
};

export default ConsultationPage;