import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { User, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.login(username, password);
            localStorage.setItem('user', JSON.stringify({ username }));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg border-t-8 border-smart-primary">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-extrabold text-smart-primary tracking-tight mb-2">Smart<span className="text-smart-secondary">Park</span></h1>
                    <p className="text-xl text-gray-500 font-medium">Employee Payroll Management System</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User size={24} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="pl-12 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-4 text-xl border transition-all"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={24} className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                className="pl-12 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-smart-secondary focus:border-smart-secondary py-4 text-xl border transition-all"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-base font-medium p-4 rounded-xl border border-red-200">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-xl font-bold text-white bg-smart-secondary hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-[1.02]"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                        {!loading && <ArrowRight size={24} className="ml-3" />}
                    </button>

                    <div className="text-center text-sm text-gray-400 mt-6">
                        <p>Use any credentials to login for demo</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
