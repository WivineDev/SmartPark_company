import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Users, UserPlus, Search } from 'lucide-react';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Initial State
    const initialFormState = {
        employeeNumber: '',
        firstName: '',
        lastName: '',
        position: '',
        address: '',
        telephone: '',
        gender: '',
        hiredDate: '',
        departmentCode: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [empData, deptData] = await Promise.all([
            api.getEmployees(),
            api.getDepartments()
        ]);
        setEmployees(empData);
        setDepartments(deptData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await api.addEmployee(formData);
            setMessage({ type: 'success', text: 'Employee registered successfully' });
            setFormData(initialFormState);
            loadData();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to register employee' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between border-b pb-6 border-gray-200">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
                        <Users className="mr-4 text-smart-primary" size={40} />
                        Employees
                    </h1>
                    <p className="text-lg text-gray-500 mt-2">Manage workforce records</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="xl:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <UserPlus size={28} className="mr-3 text-smart-secondary" />
                            New Employee
                        </h2>
                        {message && (
                            <div className={`p-4 rounded-xl mb-6 text-base font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-base font-semibold text-gray-700 mb-2">Employee No</label>
                                    <input
                                        type="text"
                                        name="employeeNumber"
                                        value={formData.employeeNumber}
                                        onChange={handleChange}
                                        required
                                        className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-semibold text-gray-700 mb-2">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                        className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-base font-semibold text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-semibold text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Position</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    required
                                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Department</label>
                                <select
                                    name="departmentCode"
                                    value={formData.departmentCode}
                                    onChange={handleChange}
                                    required
                                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept.code} value={dept.code}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Hired Date</label>
                                <input
                                    type="date"
                                    name="hiredDate"
                                    value={formData.hiredDate}
                                    onChange={handleChange}
                                    required
                                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Telephone</label>
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={(e) => {
                                        const re = /^[0-9\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            handleChange(e);
                                        }
                                    }}
                                    required
                                    placeholder="Numbers only"
                                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-700 mb-2">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-3 px-4 border text-lg"
                                />
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-lg font-bold text-white bg-smart-secondary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smart-secondary transition-colors"
                                >
                                    {loading ? 'Saving...' : 'Register'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData(initialFormState)}
                                    className="flex-1 flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-800">Directory</h3>
                            <div className="relative w-72">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search employees..."
                                    className="pl-12 block w-full border-gray-200 rounded-full text-base focus:ring-smart-secondary focus:border-smart-secondary py-2.5 px-4 border shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Emp No</th>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Position</th>
                                        <th className="px-8 py-4 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Dept</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employees.length > 0 ? (
                                        employees.map((emp) => (
                                            <tr key={emp.id} className="hover:bg-blue-50/50 transition-colors group cursor-pointer">
                                                <td className="px-8 py-5 whitespace-nowrap text-base font-bold text-smart-primary">{emp.employeeNumber || emp.id}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-base text-gray-800 font-medium group-hover:text-blue-700">{emp.firstName} {emp.lastName}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-base text-gray-600">{emp.position}</td>
                                                <td className="px-8 py-5 whitespace-nowrap text-base">
                                                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {emp.departmentCode || emp.department}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-8 text-center text-lg text-gray-500">No employees found.</td>
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

export default Employee;
