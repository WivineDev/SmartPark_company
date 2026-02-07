import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Building, Plus, DollarSign } from 'lucide-react';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        departmentCode: '',
        departmentName: '',
        grossSalary: '',
        totalDeduction: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        const data = await api.getDepartments();
        setDepartments(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await api.addDepartment(formData);
            setMessage({ type: 'success', text: 'Department added successfully' });
            setFormData({ departmentCode: '', departmentName: '', grossSalary: '', totalDeduction: '' });
            loadDepartments();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add department' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex items-end justify-between border-b pb-3 border-gray-200">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center">
                        <Building className="mr-3 text-smart-primary" size={24} />
                        Departments
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage company structure</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 sticky top-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Add Department</h2>
                        {message && (
                            <div className={`p-3 rounded-lg mb-4 text-xs font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Code</label>
                                <input
                                    type="text"
                                    name="departmentCode"
                                    value={formData.departmentCode}
                                    onChange={handleChange}
                                    placeholder="e.g. IT"
                                    required
                                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-1.5 px-3 border text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="departmentName"
                                    value={formData.departmentName}
                                    onChange={handleChange}
                                    placeholder="e.g. Information Technology"
                                    required
                                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-1.5 px-3 border text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Gross Budget</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign size={14} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        name="grossSalary"
                                        value={formData.grossSalary}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        className="pl-8 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-1.5 px-3 border text-sm"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-2 px-3 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-smart-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smart-secondary transition-colors mt-2"
                            >
                                <Plus size={18} className="mr-2" />
                                Add Department
                            </button>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-base font-bold text-gray-800">Department List</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Code</th>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Budget</th>
                                        <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Deductions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {departments.length > 0 ? (
                                        departments.map((dept, index) => (
                                            <tr key={dept.departmentCode || index} className="hover:bg-blue-50/50 transition-colors">
                                                <td className="px-5 py-3 whitespace-nowrap text-sm font-bold text-smart-primary">{dept.departmentCode || dept.code}</td>
                                                <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">{dept.departmentName || dept.name}</td>
                                                <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">{dept.grossSalary || '-'}</td>
                                                <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">{dept.totalDeduction || '-'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-5 py-5 text-center text-sm text-gray-500">No departments found.</td>
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

export default Department;
