import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-smart-background">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 w-full bg-smart-primary text-white h-16 flex items-center justify-between px-4 z-30 shadow-md">
                <div className="flex items-center space-x-2">
                    <div className="bg-white p-1 rounded-md">
                        <Menu size={20} className="text-smart-primary" />
                    </div>
                    <h1 className="text-lg font-bold">Smart<span className="text-smart-secondary">Park</span></h1>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Sidebar with toggle state */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <main className="flex-grow p-4 md:p-6 min-h-screen transition-all duration-300 pt-20 lg:pt-6">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
                <footer className="mt-12 text-center text-smart-text-secondary text-sm md:text-base">
                    <p>&copy; {new Date().getFullYear()} SmartPark Company. All rights reserved.</p>
                </footer>
            </main>
        </div>
    );
};

export default Layout;
