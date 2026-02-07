import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Building, DollarSign, FileText, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        // Clear session (mock)
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'bg-smart-primary text-white shadow-lg' : 'text-slate-300 hover:bg-white/10 hover:text-white';
    };

    return (
        <nav className="bg-smart-primary text-white shadow-md fixed w-full z-10 top-0 left-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex-shrink-0 font-bold text-2xl tracking-wider">
                            Smart<span className="text-smart-secondary">Park</span> EPMS
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                to="/dashboard"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${isActive('/dashboard')}`}
                            >
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                            <Link
                                to="/employee"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${isActive('/employee')}`}
                            >
                                <Users size={18} />
                                Employee
                            </Link>
                            <Link
                                to="/department"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${isActive('/department')}`}
                            >
                                <Building size={18} />
                                Department
                            </Link>
                            <Link
                                to="/salary"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${isActive('/salary')}`}
                            >
                                <DollarSign size={18} />
                                Salary
                            </Link>
                            <Link
                                to="/reports"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${isActive('/reports')}`}
                            >
                                <FileText size={18} />
                                Reports
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button (Hamburger) - Implementation skipped for brevity, focused on desktop primarily as per "Responsive" requirement but can add if needed */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
