import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { DollarSign, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

const Salary = () => {
    const [salaries, setSalaries] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const months = [
        '2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06',
        '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12'
    ];

    const initialFormState = {
        employeeNumber: '',
        month: '',
        grossSalary: '',
        totalDeduction: '',
        netSalary: 0
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const gross = parseFloat(formData.grossSalary) || 0;
        const deduction = parseFloat(formData.totalDeduction) || 0;
        setFormData(prev => ({ ...prev, netSalary: gross - deduction }));
    }, [formData.grossSalary, formData.totalDeduction]);

    const loadData = async () => {
        const [empData, salData] = await Promise.all([
            api.getEmployees(),
            api.getSalaries()
        ]);
        setEmployees(empData);
        setSalaries(salData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            if (isEditing) {
                await api.updateSalary(formData);
                setMessage({ type: 'success', text: 'Salary record updated successfully' });
            } else {
                await api.addSalary(formData);
                setMessage({ type: 'success', text: 'Salary record added successfully' });
            }
            setFormData(initialFormState);
            setIsEditing(false);
            loadData();
        } catch (error) {
            setMessage({ type: 'error', text: 'Operation failed' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (salary) => {
        setFormData(salary);
        setIsEditing(true);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await api.deleteSalary(id);
                loadData();
                setMessage({ type: 'success', text: 'Record deleted successfully' });
            } catch (error) {
                setMessage({ type: 'error', text: 'Delete failed' });
            }
        }
    };

    const getEmployeeName = (id) => {
        const emp = employees.find(e => e.employeeNumber == id || e.id == id);
        return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
    };

    return (
        <div className="space-y-5">
            <div className="flex items-end justify-between border-b pb-3 border-gray-200">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center">
                        <DollarSign className="mr-3 text-smart-primary" size={24} />
                        Salary Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage employee compensation</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 sticky top-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            {isEditing ? <Edit2 size={18} className="mr-2 text-smart-secondary" /> : <Plus size={18} className="mr-2 text-smart-secondary" />}
                            {isEditing ? 'Edit Salary' : 'Add New Salary'}
                        </h2>
                        {message && (
                            <div className={`p-3 rounded-lg mb-4 text-xs font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {message.text}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Employee</label>
                                <select
                                    name="employeeNumber"
                                    value={formData.employeeNumber}
                                    onChange={handleChange}
                                    required
                                    disabled={isEditing}
                                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-1.5 px-3 border text-sm"
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map(emp => (
                                        <option key={emp.employeeNumber} value={emp.employeeNumber}>{emp.firstName} {emp.lastName} ({emp.employeeNumber})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Month</label>
                                <select
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    required
                                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-1.5 px-3 border text-sm"
                                >
                                    <option value="">Select Month</option>
                                    {months.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Gross</label>
                                    <input
                                        type="number"
                                        name="grossSalary"
                                        value={formData.grossSalary}
                                        onChange={handleChange}
                                        required
                                        placeholder="0.00"
                                        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-1.5 px-3 border text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Deduction</label>
                                    <input
                                        type="number"
                                        name="totalDeduction"
                                        value={formData.totalDeduction}
                                        onChange={handleChange}
                                        required
                                        placeholder="0.00"
                                        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-1.5 px-3 border text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Net Salary</label>
                                <div className="block w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-gray-800 font-extrabold text-lg shadow-inner">
                                    ${(parseFloat(formData.netSalary) || 0).toLocaleString()}
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 flex justify-center py-2 px-3 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-smart-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smart-secondary transition-colors"
                                >
                                    {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add Salary')}
                                </button>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData(initialFormState);
                                            setIsEditing(false);
                                        }}
                                        className="flex justify-center py-2 px-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-base font-bold text-gray-800">Payroll Records</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Month</th>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Net Salary</th>
                                        <th className="px-5 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {salaries.length > 0 ? (
                                        salaries.map((salary) => (
                                            <tr key={salary.salaryId} className="hover:bg-blue-50/50 transition-colors">
                                                <td className="px-5 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {getEmployeeName(salary.employeeNumber)}
                                                </td>
                                                <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">{salary.month}</td>
                                                <td className="px-5 py-3 whitespace-nowrap text-sm font-bold text-green-600">${salary.netSalary}</td>
                                                <td className="px-5 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(salary)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(salary.salaryId)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-5 py-5 text-center text-sm text-gray-500">No salary records found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Salary;
