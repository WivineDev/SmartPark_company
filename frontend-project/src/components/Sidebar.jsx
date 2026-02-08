import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building, DollarSign, FileText, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        if (toggleSidebar) toggleSidebar();
    };

    const isActive = (path) => {
        return location.pathname === path
            ? 'bg-smart-secondary text-white shadow-md'
            : 'text-gray-300 hover:bg-white/10 hover:text-white';
    };

    const NavItem = ({ to, icon: Icon, label }) => (
        <Link
            to={to}
            onClick={() => { if (window.innerWidth < 1024) toggleSidebar(); }}
            className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg mb-1 mx-2 ${isActive(to)}`}
        >
            <Icon size={20} className="mr-3" />
            <span>{label}</span>
        </Link>
    );

    return (
        <div className={`h-screen w-60 bg-smart-primary text-white flex flex-col fixed left-0 top-0 shadow-xl z-40 transition-all duration-300 transform 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen lg:z-20`}>
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center space-x-3">
                    <div className="bg-white p-1.5 rounded-md">
                        <LayoutDashboard size={24} className="text-smart-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Smart<span className="text-smart-secondary">Park</span></h1>
                        <p className="text-[10px] text-smart-secondary uppercase tracking-widest">EPMS Admin</p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 py-5 overflow-y-auto">
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                <NavItem to="/employee" icon={Users} label="Employees" />
                <NavItem to="/department" icon={Building} label="Departments" />
                <NavItem to="/salary" icon={DollarSign} label="Payroll" />
                <NavItem to="/reports" icon={FileText} label="Reports" />
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-smart-secondary hover:bg-blue-400 rounded-lg transition-colors shadow-md"
                >
                    <LogOut size={18} className="mr-2" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
