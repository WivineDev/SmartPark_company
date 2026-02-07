import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-smart-background">
            <Sidebar />
            <main className="flex-grow ml-60 p-6 min-h-screen transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
                <footer className="mt-12 text-center text-smart-text-secondary text-base">
                    <p>&copy; {new Date().getFullYear()} SmartPark Company. All rights reserved.</p>
                </footer>
            </main>
        </div>
    );
};

export default Layout;
