// components/Footer.jsx
import HealthLogo from "../../../../public/logo/HealthLogo.jsx";

function Footer() {
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center space-x-6">
                    <div className="flex-shrink-0">
                        <HealthLogo className="h-8 w-auto" />
                    </div>

                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Swasthya Sampark™. All Rights Reserved.
                    </div>

                    <nav className="flex space-x-4">
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">About</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms</a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;