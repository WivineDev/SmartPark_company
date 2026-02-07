import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <h1 className="text-9xl font-bold text-smart-primary opacity-20">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-gray-500 mt-2 mb-8">The page you are looking for doesn't exist or has been moved.</p>
            <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-smart-primary hover:bg-blue-800 transition-colors"
            >
                <Home size={18} className="mr-2" />
                Back to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
