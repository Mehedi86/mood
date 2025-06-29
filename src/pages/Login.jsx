import React, { useState } from 'react';
import SocialLogin from '../components/SocialLogin';
import useAuthInfo from '../hooks/useAuthInfo';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser } = useAuthInfo();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page the user was trying to visit or default to home
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log("User logged in:", user);
                // Redirect to intended route
                setTimeout(() => navigate(from, { replace: true }), 1000);
            })
            .catch(error => {
                console.error("Error during login:", error);
            });
    };

    return (
        <div className='max-w-sm mx-auto py-20 px-2'>
            <form onSubmit={handleLogin}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-2">
                    <input type="checkbox" id="show-password" onChange={() => setShowPassword(!showPassword)} className="mr-2" />
                    <label htmlFor="show-password" className="text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login
                </button>
            </form>

            <SocialLogin />
        </div>
    );
};

export default Login;
