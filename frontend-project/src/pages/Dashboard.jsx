import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Users, Building, DollarSign, UserPlus, PlusCircle, FileBarChart, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        employees: 0,
        departments: 0,
        totalSalary: 0
    });
    const [deptStats, setDeptStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const employees = await api.getEmployees();
            const departments = await api.getDepartments();
            const salaries = await api.getSalaries();

            const totalSalary = salaries.reduce((acc, curr) => acc + parseFloat(curr.netSalary || 0), 0);

            // Calculate stats per department
            const dStats = departments.map(dept => {
                const deptEmps = employees.filter(e => e.departmentCode === dept.departmentCode);
                const deptSals = salaries.filter(s => {
                    const emp = employees.find(e => e.employeeNumber === s.employeeNumber);
                    return emp && emp.departmentCode === dept.departmentCode;
                });
                const deptPayroll = deptSals.reduce((acc, curr) => acc + parseFloat(curr.netSalary || 0), 0);

                return {
                    name: dept.departmentName,
                    code: dept.departmentCode,
                    count: deptEmps.length,
                    payroll: deptPayroll
                };
            });

            setStats({
                employees: employees.length,
                departments: departments.length,
                totalSalary
            });
            setDeptStats(dStats);
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
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-3 gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">Real-time company metrics and shortcuts</p>
                </div>
                <div className="text-sm text-gray-700 font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Admin Console <span className="mx-2 text-gray-300">|</span> <span className="text-smart-primary">EPMS v1.0</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Total Employees"
                    value={stats.employees}
                    icon={Users}
                    color="text-smart-primary"
                    bg="bg-blue-50"
                />
                <StatCard
                    title="Active Departments"
                    value={stats.departments}
                    icon={Building}
                    color="text-smart-warning"
                    bg="bg-orange-50"
                />
                <StatCard
                    title="Monthly Payroll"
                    value={`$${stats.totalSalary.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-smart-success"
                    bg="bg-green-50"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Departmental Summary Table */}
                <div className="xl:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <h3 className="text-base font-bold text-gray-800 flex items-center">
                            <Building size={18} className="mr-2 text-smart-primary" />
                            Departmental Breakdown
                        </h3>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Stats</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Employees</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Payroll Cost</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {deptStats.map((dept, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{dept.name}</div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{dept.code}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="px-3 py-1 bg-blue-50 text-smart-primary text-xs font-bold rounded-full border border-blue-100">
                                                {dept.count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-700">
                                            ${dept.payroll.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center">
                            <PlusCircle size={18} className="mr-2 text-smart-secondary" />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/employee')}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg group transition-all border border-gray-100"
                            >
                                <div className="flex items-center">
                                    <div className="p-2 bg-white rounded-md shadow-sm mr-3 group-hover:text-smart-primary transition-colors">
                                        <UserPlus size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Register Employee</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate('/salary')}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-green-50 rounded-lg group transition-all border border-gray-100"
                            >
                                <div className="flex items-center">
                                    <div className="p-2 bg-white rounded-md shadow-sm mr-3 group-hover:text-smart-success transition-colors">
                                        <DollarSign size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Add Salary Record</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate('/reports')}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-orange-50 rounded-lg group transition-all border border-gray-100"
                            >
                                <div className="flex items-center">
                                    <div className="p-2 bg-white rounded-md shadow-sm mr-3 group-hover:text-smart-warning transition-colors">
                                        <FileBarChart size={18} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">View Payroll Reports</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
