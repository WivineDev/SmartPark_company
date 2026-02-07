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
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center space-x-6 border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className={`p-6 rounded-2xl ${bg} ${color}`}>
                <Icon size={48} />
            </div>
            <div>
                <p className="text-xl font-bold text-gray-600 mb-1 uppercase tracking-wide">{title}</p>
                <h3 className="text-5xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            <div className="flex items-end justify-between border-b-2 border-gray-200 pb-6">
                <div>
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
                    <p className="text-xl text-gray-600 mt-2 font-medium">Overview of company metrics</p>
                </div>
                <div className="text-lg text-gray-700 font-bold bg-white px-8 py-4 rounded-full shadow-md border border-gray-100">
                    Welcome back, <span className="text-smart-primary">Admin</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center border-b pb-4 border-gray-100">
                        <Activity size={28} className="mr-3 text-smart-primary" />
                        Recent Activity
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-blue-50 transition-colors">
                            <div className="w-4 h-4 bg-blue-600 rounded-full mr-6 shadow-sm"></div>
                            <p className="text-xl text-gray-700 font-medium">System updated successfully.</p>
                        </div>
                        <div className="flex items-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-green-50 transition-colors">
                            <div className="w-4 h-4 bg-green-600 rounded-full mr-6 shadow-sm"></div>
                            <p className="text-xl text-gray-700 font-medium">Payroll generated for October.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-smart-primary to-blue-900 p-10 rounded-3xl shadow-lg text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-10 transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-700">
                        <Building size={200} />
                    </div>
                    <h3 className="font-bold text-3xl mb-6 relative z-10 border-b border-white/20 pb-4">SmartPark Company Info</h3>
                    <p className="opacity-95 text-xl leading-relaxed relative z-10 font-medium">
                        Currently managing <span className="font-extrabold text-yellow-300 text-2xl">{stats.employees}</span> active employees across <span className="font-extrabold text-yellow-300 text-2xl">{stats.departments}</span> different departments. Use the sidebar to manage records.
                    </p>
                    <button className="mt-10 px-8 py-4 bg-white text-smart-primary font-bold text-xl rounded-2xl hover:bg-gray-100 transition-colors relative z-10 shadow-lg">
                        View Company Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
