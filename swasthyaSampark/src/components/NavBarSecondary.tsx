import Logo from "./Logo"; // Adjust the import path as needed

export function NavBarSecondary() {
    return (
        <nav className="bg-green-800 text-white py-4 px-6 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Logo />
                    <span className="font-semibold text-xl">Health Navigation</span>
                </div>
                <div className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-green-200 transition-colors duration-200">About</a>
                    <a href="#" className="hover:text-green-200 transition-colors duration-200">Services</a>
                    <a href="#" className="hover:text-green-200 transition-colors duration-200">Contact</a>
                </div>
            </div>
        </nav>
    );
}