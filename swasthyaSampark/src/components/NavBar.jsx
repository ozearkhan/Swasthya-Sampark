import React, { useState, useEffect } from 'react';
import Logo from "./Logo.jsx";
import '../CSS/NavBar.css'; // Import the CSS file

export function NavBar() {
    const [scrolled, setScrolled] = useState(false);

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
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-1">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Logo />
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-[#175134] hover:bg-[#0f3a24] focus:ring-4 focus:outline-none focus:ring-[#143c2d] font-medium rounded-lg text-lg px-6 py-2 text-center dark:bg-[#175134] dark:hover:bg-[#0f3a24] dark:focus:ring-[#143c2d]"
                    >
                        Get Started
                    </button>

                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
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
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 bg-transparent">
                        <li>
                            <a
                                href="#"
                                className={`nav-link block py-2 px-3 rounded ${
                                    scrolled ? 'text-gray-900 hover:text-black' : 'text-gray-500 hover:text-black'
                                } font-poppins`}
                            >
                                About us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`nav-link block py-2 px-3 rounded ${
                                    scrolled ? 'text-gray-900 hover:text-black' : 'text-gray-500 hover:text-black'
                                } font-poppins`}
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
                            >
                                For business
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
