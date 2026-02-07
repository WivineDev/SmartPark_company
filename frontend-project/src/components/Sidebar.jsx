import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building, DollarSign, FileText, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path
            ? 'bg-smart-secondary text-white shadow-md'
            : 'text-gray-300 hover:bg-white/10 hover:text-white';
    };

    const NavItem = ({ to, icon: Icon, label }) => (
        <Link
            to={to}
            className={`flex items-center px-6 py-4 text-lg font-medium transition-all duration-200 rounded-xl mb-2 mx-2 ${isActive(to)}`}
        >
            <Icon size={24} className="mr-4" />
            <span>{label}</span>
        </Link>
    );

    return (
        <div className="h-screen w-80 bg-smart-primary text-white flex flex-col fixed left-0 top-0 shadow-2xl z-20">
            <div className="p-8 border-b border-white/10">
                <Link to="/dashboard" className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-lg">
                        <LayoutDashboard size={32} className="text-smart-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Smart<span className="text-smart-secondary">Park</span></h1>
                        <p className="text-xs text-smart-secondary uppercase tracking-widest">EPMS Admin</p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 py-8 overflow-y-auto">
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                <NavItem to="/employee" icon={Users} label="Employees" />
                <NavItem to="/department" icon={Building} label="Departments" />
                <NavItem to="/salary" icon={DollarSign} label="Payroll" />
                <NavItem to="/reports" icon={FileText} label="Reports" />
            </nav>

            <div className="p-6 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-6 py-4 text-lg font-medium text-white bg-smart-secondary hover:bg-blue-400 rounded-xl transition-colors shadow-lg"
                >
                    <LogOut size={24} className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
