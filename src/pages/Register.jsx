import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError('');

        if (!phone || !password) {
            setError('Phone and password are required');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('https://mood-app-server.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            alert('Registration successful');
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Server error');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4 font-semibold">Register</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mb-3 px-4 py-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-3 px-4 py-2 border rounded"
                />
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </div>
        </div>
    );
};

export default Register;
