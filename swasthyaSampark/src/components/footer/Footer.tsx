// components/Footer.jsx
import Logo from '../../../public/logo/Logo.tsx';

function Footer() {
    return (
        <footer className="m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:pt-36">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/swasthyaSampark/public" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Logo/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">

            </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6 text-gray-700">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6 text-black">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6 text-gray-700">Terms of Service</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-black">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-700 sm:text-center">
          © {new Date().getFullYear()} <a href="/swasthyaSampark/public" className="hover:underline text-black">Swasthya Sampark™</a>. All Rights Reserved.
        </span>
            </div>
        </footer>
    );
}

export default Footer;