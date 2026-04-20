import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-coral-500 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🍽️</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-coral-500 bg-clip-text text-transparent">
                                Cravelt
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Discover the best restaurants near you with AI-powered recommendations.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Features</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link to="/search" className="hover:text-orange-500 transition-colors">Search Restaurants</Link></li>
                            <li><Link to="/ai-advisor" className="hover:text-orange-500 transition-colors">AI Advisor</Link></li>
                            <li><Link to="/preferences" className="hover:text-orange-500 transition-colors">Food Preferences</Link></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Restaurant Listings</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>&copy; 2026 Cravelt. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
