import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-smart-border py-4 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-smart-muted">
                <p>&copy; {new Date().getFullYear()} SmartPark Company. All rights reserved.</p>
                <p>Employee Payroll Management System v1.0</p>
            </div>
        </footer>
    );
};

export default Footer;
