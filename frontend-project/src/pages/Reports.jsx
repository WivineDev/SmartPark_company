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
        <div className="space-y-5">
            <div className="flex items-end justify-between border-b pb-3 border-gray-200">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center">
                        <FileText className="mr-3 text-smart-primary" size={24} />
                        Payroll Reports
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Generate and view monthly payroll summaries</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm"
                    >
                        <Printer size={16} className="mr-2" />
                        Print
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center px-3 py-2 bg-smart-primary hover:bg-blue-800 text-white rounded-lg font-bold transition-colors shadow-sm text-sm"
                    >
                        <Download size={16} className="mr-2" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                    <div className="w-full md:w-64">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Select Month</label>
                        <select
                            name="month"
                            value={filters.month}
                            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                            className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-1.5 px-3 border text-sm"
                        >
                            <option value="">-- All Months --</option>
                            {months.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Report Content */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden min-h-[400px]">
                {filteredData.length > 0 ? (
                    <div>
                        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="text-base font-bold text-gray-800">
                                Payroll Summary {filters.month && `- ${filters.month}`}
                            </h3>
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                                {filteredData.length} Records Found
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Month</th>
                                        <th className="px-5 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Gross</th>
                                        <th className="px-5 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Deduction</th>
                                        <th className="px-5 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Net Salary</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.map((item, index) => (
                                        <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-bold text-gray-900">{item.firstName} {item.lastName}</div>
                                                </div>
                                                <div className="text-xs text-gray-500">{item.position}</div>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">
                                                <span className="px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                    {item.departmentName}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">{item.month}</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-600">${parseFloat(item.grossSalary || 0).toLocaleString()}</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-right font-medium text-red-600">-${parseFloat(item.totalDeduction || 0).toLocaleString()}</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-right font-bold text-green-600">${parseFloat(item.netSalary || 0).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                    <tr>
                                        <td colSpan="3" className="px-5 py-3 text-sm font-bold text-gray-900 text-right">Totals:</td>
                                        <td className="px-5 py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                                            ${filteredData.reduce((acc, curr) => acc + parseFloat(curr.grossSalary || 0), 0).toLocaleString()}
                                        </td>
                                        <td className="px-5 py-3 whitespace-nowrap text-sm font-bold text-red-600 text-right">
                                            -${filteredData.reduce((acc, curr) => acc + parseFloat(curr.totalDeduction || 0), 0).toLocaleString()}
                                        </td>
                                        <td className="px-5 py-3 whitespace-nowrap text-sm font-bold text-green-600 text-right">
                                            ${filteredData.reduce((acc, curr) => acc + parseFloat(curr.netSalary || 0), 0).toLocaleString()}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FileText size={32} className="text-gray-300 mb-4" />
                        <p className="text-base font-medium">No records found used the selected criteria.</p>
                        <p className="text-xs">Try selecting a different month.</p>
                    </div>
                )}
            </div>
            <style>{`
                @media print {
                    .no-print { display: none; }
                    .print-section { box-shadow: none; border: none; }
                    body { background: white; }
                     /* Ensure sidebar is hidden in print */
                    .h-screen.w-60, .fixed.left-0 { display: none; }
                    main { margin-left: 0 !important; padding: 0 !important; }
                }
            `}</style>
        </div>
    );
};

export default Reports;
