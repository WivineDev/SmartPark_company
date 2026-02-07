import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Building, Plus, DollarSign } from 'lucide-react';

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        code: '',
        name: '',
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
            setFormData({ code: '', name: '', grossSalary: '', totalDeduction: '' });
            loadDepartments();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add department' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between border-b pb-6 border-gray-200">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
                        <Building className="mr-4 text-smart-primary" size={40} />
                        Departments
                    </h1>
                    <p className="text-lg text-gray-500 mt-2">Manage company structure</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Department</h2>
                        {message && (
                            <div className={`p-4 rounded-xl mb-6 text-base font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    placeholder="e.g. IT"
                                    required
                                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Information Technology"
                                    required
                                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Gross Budget</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <DollarSign size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        name="grossSalary"
                                        value={formData.grossSalary}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        className="pl-10 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-lg font-bold text-white bg-smart-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smart-secondary transition-colors mt-4"
                            >
                                <Plus size={24} className="mr-2" />
                                Add Department
                            </button>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-800">Department List</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Code</th>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Budget</th>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Deductions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {departments.length > 0 ? (
                                        departments.map((dept, index) => (
                                            <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                                                <td className="px-8 py-5 whitespace-nowrap text-lg font-bold text-smart-primary">{dept.code}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-lg text-gray-800 font-medium">{dept.name}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-lg text-gray-600">{dept.grossSalary || '-'}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-lg text-gray-600">{dept.totalDeduction || '-'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-8 text-center text-lg text-gray-500">No departments found.</td>
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
