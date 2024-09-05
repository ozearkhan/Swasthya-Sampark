import { useState, useEffect } from 'react';
import Logo from "../../../../public/logo/Logo.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from '../services/api.ts';
import '../../../CSS/ButtonComponent.css';
import './navbar.css';

type UserRole = "patient" | "doctor" | null;

interface NavButtonProps {
    to: string;
    children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ to, children }) => (
    <Link to={to} className="buttonComponentTransparent">
        {children}
    </Link>
);

interface NavBarProps {
    isPatient?: boolean;
    isDoctor?: boolean;
    isLogout?: boolean;
}

export function NavBar({ isPatient, isDoctor, isLogout }: NavBarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<UserRole>(null);
    const navigate = useNavigate();
    if(isDoctor||isLogout||isPatient){

    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.post<{ role: UserRole }>(`${BACKEND_URL}/api/auth/verify`, { token });
                    setUserRole(response.data.role);
                } catch (error) {
                    console.error('Token verification failed:', error);
                    setUserRole(null);
                }
            } else {
                setUserRole(null);
            }
            setLoading(false);
        };

        verifyToken();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserRole(null);
        navigate('/');
    };

    if (loading) {
        return <div className="loading-placeholder">Loading...</div>; // Optionally, replace with a spinner
    }

    return (
        <>
            <nav
                className={`fixed w-full z-20 top-0 transition-all duration-200 ${
                    scrolled ? 'bg-white bg-opacity-90 shadow-md' : 'bg-white bg-opacity-70 shadow-lg'
                }`}
                id="navbar-sticky"
            >
                <div className="max-w-screen-2xl w-[95%] flex flex-wrap items-center justify-between mx-auto p-3">
                    <Link to="/" className="flex items-center">
                        <Logo />
                    </Link>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto space-x-4">
                        <ul className="flex flex-col md:flex-row items-center space-x-4 font-medium">
                            {userRole === 'patient' && (
                                <>
                                    <li>
                                        <NavButton to="/consultation/patient">Patient</NavButton>
                                    </li>
                                    <li>
                                        <NavButton to="/consultation/chat_bot">AI Assistant</NavButton>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="buttonComponentTransparent"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                            {userRole === 'doctor' && (
                                <>
                                    <li>
                                        <NavButton to="/consultation/doctor">Doctor</NavButton>
                                    </li>
                                    <li>
                                        <NavButton to="/consultation/chat_bot">AI Assistant</NavButton>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="buttonComponentTransparent"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                            {userRole === null && (
                                <>
                                    <li>
                                        <NavButton to="/consultation/patient">Patient</NavButton>
                                    </li>
                                    <li>
                                        <NavButton to="/consultation/doctor">Doctor</NavButton>
                                    </li>
                                    <li>
                                        <NavButton to="/consultation/chat_bot">AI Assistant</NavButton>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="pt-32"></div>
        </>
    );
}

export default NavBar;
