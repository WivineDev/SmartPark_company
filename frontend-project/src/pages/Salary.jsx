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
        employeeId: '',
        month: '',
        gross: '',
        deduction: '',
        net: 0
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const gross = parseFloat(formData.gross) || 0;
        const deduction = parseFloat(formData.deduction) || 0;
        setFormData(prev => ({ ...prev, net: gross - deduction }));
    }, [formData.gross, formData.deduction]);

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
        const emp = employees.find(e => e.id == id || e.employeeNumber == id);
        return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
    };

    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between border-b pb-6 border-gray-200">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
                        <DollarSign className="mr-4 text-smart-primary" size={40} />
                        Salary Management
                    </h1>
                    <p className="text-lg text-gray-500 mt-2">Manage employee compensation</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            {isEditing ? <Edit2 size={24} className="mr-3 text-smart-secondary" /> : <Plus size={24} className="mr-3 text-smart-secondary" />}
                            {isEditing ? 'Edit Salary' : 'Add New Salary'}
                        </h2>
                        {message && (
                            <div className={`p-4 rounded-xl mb-6 text-base font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {message.text}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Employee</label>
                                <select
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    required
                                    disabled={isEditing}
                                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName} ({emp.employeeNumber})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Month</label>
                                <select
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    required
                                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                >
                                    <option value="">Select Month</option>
                                    {months.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-base font-semibold text-gray-700 mb-2">Gross</label>
                                    <input
                                        type="number"
                                        name="gross"
                                        value={formData.gross}
                                        onChange={handleChange}
                                        required
                                        placeholder="0.00"
                                        className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-semibold text-gray-700 mb-2">Deduction</label>
                                    <input
                                        type="number"
                                        name="deduction"
                                        value={formData.deduction}
                                        onChange={handleChange}
                                        required
                                        placeholder="0.00"
                                        className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-gray-700 mb-2">Net Salary</label>
                                <div className="block w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 text-gray-800 font-extrabold text-2xl shadow-inner">
                                    ${formData.net.toLocaleString()}
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-lg font-bold text-white bg-smart-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smart-secondary transition-colors"
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
                                        className="flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
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
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-800">Payroll Records</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Month</th>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Net Salary</th>
                                        <th className="px-8 py-4 text-right text-sm font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {salaries.length > 0 ? (
                                        salaries.map((salary) => (
                                            <tr key={salary.id} className="hover:bg-blue-50/50 transition-colors">
                                                <td className="px-8 py-5 whitespace-nowrap text-lg font-medium text-gray-900">
                                                    {getEmployeeName(salary.employeeId)}
                                                </td>
                                                <td className="px-8 py-5 whitespace-nowrap text-lg text-gray-600">{salary.month}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-lg font-bold text-green-600">${salary.net}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-right text-lg font-medium">
                                                    <button
                                                        onClick={() => handleEdit(salary)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-6"
                                                    >
                                                        <Edit2 size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(salary.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-8 text-center text-lg text-gray-500">No salary records found.</td>
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
