import React, { useState, useEffect } from 'react';
import Logo from "../../Logo.tsx";
import { Link, useNavigate } from "react-router-dom";
import '../../../CSS/ButtonComponent.css';
import './navbar.css'

export function NavBar({ isPatient, isDoctor, isLogout }) {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const NavButton = ({ to, children }) => (
        <Link
            to={to}
            className="buttonComponentTransparent"
        >
            {children}
        </Link>
    );

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
                        <Logo/>
                    </Link>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto space-x-4">
                        <ul className="flex flex-col md:flex-row items-center space-x-4 font-medium">
                            {isPatient && (
                                <li>
                                    <NavButton to="/consultation/patient">Patient</NavButton>
                                </li>
                            )}
                            {isDoctor && (
                                <li>
                                    <NavButton to="/consultation/doctor">Doctor</NavButton>
                                </li>
                            )}
                            <li>
                                <NavButton to="/consultation/chat_bot">AI Assistant</NavButton>
                            </li>
                            {isLogout && (
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="buttonComponentTransparent"
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

            </nav>
            <div className="pt-32">

            </div>
        </>

    );
}

export default NavBar;