import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FileText, Printer, Download, Search, Filter } from 'lucide-react';

const Reports = () => {
    const [salaries, setSalaries] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        month: '',
        search: ''
    });

    const months = [
        '2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06',
        '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12'
    ];

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterData();
    }, [salaries, employees, filters]);

    const loadData = async () => {
        const [empData, salData, deptData] = await Promise.all([
            api.getEmployees(),
            api.getSalaries(),
            api.getDepartments()
        ]);
        setEmployees(empData);
        setSalaries(salData);
        setDepartments(deptData);
    };

    const filterData = () => {
        let data = salaries.map(salary => {
            const employee = employees.find(e => e.id == salary.employeeId || e.employeeNumber == salary.employeeId);
            const department = departments.find(d => d.code === employee?.departmentCode) || { name: employee?.department || 'N/A' };

            return {
                ...salary,
                firstName: employee?.firstName || 'Unknown',
                lastName: employee?.lastName || 'Unknown',
                position: employee?.position || 'Unknown',
                departmentName: department.name
            };
        });

        if (filters.month) {
            data = data.filter(item => item.month === filters.month);
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            data = data.filter(item =>
                item.firstName.toLowerCase().includes(searchLower) ||
                item.lastName.toLowerCase().includes(searchLower) ||
                item.position.toLowerCase().includes(searchLower) ||
                item.departmentName.toLowerCase().includes(searchLower)
            );
        }

        setFilteredData(data);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExport = () => {
        alert('Export to PDF functionality would start download here.');
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between no-print border-b pb-6 border-gray-200">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
                        <FileText className="mr-4 text-smart-primary" size={40} />
                        Payroll Reports
                    </h1>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={handlePrint}
                        className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-xl shadow-sm text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Printer size={20} className="mr-3" />
                        Print
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center px-6 py-3 bg-smart-secondary text-white rounded-xl shadow-md text-lg font-bold hover:bg-green-600 transition-colors"
                    >
                        <Download size={20} className="mr-3" />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden no-print">
                <div className="p-8 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="flex-1 max-w-sm">
                            <label className="block text-base font-semibold text-gray-700 mb-2">Filter by Month</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Filter size={20} className="text-gray-400" />
                                </div>
                                <select
                                    value={filters.month}
                                    onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
                                    className="pl-12 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                >
                                    <option value="">All Months</option>
                                    {months.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-base font-semibold text-gray-700 mb-2">Search Employee</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={filters.search}
                                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                    placeholder="Search by name, position or department..."
                                    className="pl-12 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden print-section">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-xl font-bold text-gray-800">Monthly Payroll Report</h3>
                    {filters.month && <span className="text-base font-bold text-smart-primary bg-blue-100 px-4 py-2 rounded-full">{filters.month}</span>}
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Employee Name</th>
                                <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Position</th>
                                <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Period</th>
                                <th className="px-8 py-4 text-right text-sm font-bold text-gray-500 uppercase tracking-wider">Net Salary</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-8 py-5 whitespace-nowrap text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</td>
                                        <td className="px-8 py-5 whitespace-nowrap text-lg text-gray-600">{item.position}</td>
                                        <td className="px-8 py-5 whitespace-nowrap text-lg text-gray-600">{item.departmentName}</td>
                                        <td className="px-8 py-5 whitespace-nowrap text-lg text-gray-600">{item.month}</td>
                                        <td className="px-8 py-5 whitespace-nowrap text-right text-lg font-bold text-gray-900">${item.net.toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-8 text-center text-lg text-gray-500">No records found.</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan="4" className="px-8 py-6 text-right text-xl font-bold text-gray-900 border-t-2 border-gray-200">Total Net Payout:</td>
                                <td className="px-8 py-6 text-right text-xl font-extrabold text-smart-secondary border-t-2 border-gray-200">
                                    ${filteredData.reduce((acc, curr) => acc + curr.net, 0).toLocaleString()}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <style>{`
                @media print {
                    .no-print { display: none; }
                    .print-section { box-shadow: none; border: none; }
                    body { background: white; }
                     /* Ensure sidebar is hidden in print */
                    .h-screen.w-64, .fixed.left-0 { display: none; }
                    main { margin-left: 0 !important; padding: 0 !important; }
                }
            `}</style>
        </div>
    );
};

export default Reports;
