import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Users, Building, DollarSign, Activity } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        employees: 0,
        departments: 0,
        totalSalary: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            const employees = await api.getEmployees();
            const departments = await api.getDepartments();
            const salaries = await api.getSalaries();

            const totalSalary = salaries.reduce((acc, curr) => acc + curr.net, 0);

            setStats({
                employees: employees.length,
                departments: departments.length,
                totalSalary
            });
        };
        fetchData();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color, bg }) => (
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center space-x-4 border border-gray-100 hover:shadow-md transition-all">
            <div className={`p-3 rounded-lg ${bg} ${color}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-500 mb-0.5 uppercase tracking-wide">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="space-y-5">
            <div className="flex items-end justify-between border-b border-gray-200 pb-3">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                    <p className="text-gray-500 mt-1 font-medium text-xs">Overview of company metrics</p>
                </div>
                <div className="text-xs text-gray-700 font-bold bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                    Welcome back, <span className="text-smart-primary">Admin</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Total Employees"
                    value={stats.employees}
                    icon={Users}
                    color="text-smart-primary"
                    bg="bg-white border-l-4 border-smart-primary"
                />
                <StatCard
                    title="Total Departments"
                    value={stats.departments}
                    icon={Building}
                    color="text-smart-warning"
                    bg="bg-white border-l-4 border-smart-warning"
                />
                <StatCard
                    title="Total Payroll"
                    value={`$${stats.totalSalary.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-smart-success"
                    bg="bg-white border-l-4 border-smart-success"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center border-b pb-2 border-gray-100">
                        <Activity size={18} className="mr-2 text-smart-primary" />
                        Recent Activity
                    </h3>
                    <div className="space-y-2">
                        <div className="flex items-center p-2.5 bg-gray-50 rounded-lg border border-gray-100 hover:bg-blue-50 transition-colors">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 shadow-sm"></div>
                            <p className="text-gray-700 font-medium text-xs">System updated successfully.</p>
                        </div>
                        <div className="flex items-center p-2.5 bg-gray-50 rounded-lg border border-gray-100 hover:bg-green-50 transition-colors">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-3 shadow-sm"></div>
                            <p className="text-gray-700 font-medium text-xs">Payroll generated for October.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-smart-primary to-blue-900 p-4 rounded-xl shadow-md text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                        <Building size={100} />
                    </div>
                    <h3 className="font-bold text-lg mb-2 relative z-10 border-b border-white/20 pb-2">SmartPark Company Info</h3>
                    <p className="opacity-95 text-sm leading-relaxed relative z-10 font-medium">
                        Currently managing <span className="font-extrabold text-yellow-300 text-base">{stats.employees}</span> active employees across <span className="font-extrabold text-yellow-300 text-base">{stats.departments}</span> different departments. Use the sidebar to manage records.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-white text-smart-primary font-bold text-sm rounded-lg hover:bg-gray-100 transition-colors relative z-10 shadow-sm">
                        View Company Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
