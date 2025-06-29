import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Import navigate hook
import useAuthInfo from '../hooks/useAuthInfo'; // Custom hook for AuthContext

const Login = () => {
  const { setUser } = useAuthInfo(); // Get setUser from context
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 👈 Initialize navigate

  const handleLogin = async () => {
    if (!phone || !password) {
      alert('Phone and password are required');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('https://mood-app-server.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save to localStorage
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('phone', data.data);

      // Update global context
      setUser({ phone });

      alert('Logged in!');
      navigate('/'); // 👈 Redirect to home
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-500">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
