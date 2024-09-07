import { useState, useEffect } from 'react';
import Logo from "../../../public/logo/Logo.tsx";
import '../../CSS/NavBar.css';
import { useNavigate } from "react-router-dom";

export function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleStartSurvey = () => {
        navigate('/survey');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed w-full z-20 top-0 start-0 transition-colors duration-200 ${
                scrolled ? 'scrolled' : ''
            }`}
            id="navbar-sticky"
        >
            <div className="max-w-screen-2xl w-[95%] flex flex-wrap items-center justify-between mx-auto p-1">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Logo />
                </a>
                <div className="flex lg:order-2">
                    <button
                        type="button"
                        className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        onClick={toggleMenu}
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="hidden lg:inline-block text-white bg-[#175134] hover:bg-[#0f3a24] font-medium rounded-xl text-base px-6 py-2 text-center dark:bg-[#175134] dark:hover:bg-[#0f3a24] dark:focus:ring-[#143c2d]"
                        onClick={handleStartSurvey}
                    >
                        Get Started
                    </button>
                </div>
                <div
                    className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 pr-24 ${
                        isMenuOpen ? 'block' : 'hidden'
                    }`}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 bg-transparent">
                        <li>
                            <a
                                href="#"
                                className={`nav-link block py-2 px-3 rounded ${
                                    scrolled ? 'text-gray-900 hover:text-black' : 'text-gray-500 hover:text-black'
                                } font-poppins`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About us
                            </a>
                        </li>
                        <li>
                            <a
                                href="/services"
                                className={`nav-link block py-2 px-3 rounded ${
                                    scrolled ? 'text-gray-900 hover:text-black' : 'text-gray-500 hover:text-black'
                                } font-poppins`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`nav-link block py-2 px-3 rounded ${
                                    scrolled ? 'text-gray-900 hover:text-black' : 'text-gray-500 hover:text-black'
                                } font-poppins`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                For business
                            </a>
                        </li>
                        <li className="lg:hidden">
                            <button
                                type="button"
                                className="w-full text-white bg-[#175134] hover:bg-[#0f3a24] font-medium rounded-xl text-base px-6 py-2 text-center dark:bg-[#175134] dark:hover:bg-[#0f3a24] dark:focus:ring-[#143c2d]"
                                onClick={handleStartSurvey}
                            >
                                Get Started
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}