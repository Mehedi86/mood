import React from 'react';
import { FaGoogle } from "react-icons/fa";
import useAuthInfo from '../hooks/useAuthInfo';

const SocialLogin = () => {
    const {googleSignIn} = useAuthInfo();
    const handleSocialLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.error("Error during social login:", error);
            });
    };  
    return (
        <div className='py-4'>
            <button onClick={handleSocialLogin} className="relative cursor-pointer inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="relative flex items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    <FaGoogle size={20}/>Continue with google
                </span>
            </button>
        </div>
    );
};

export default SocialLogin;