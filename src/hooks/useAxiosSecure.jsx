import axios from 'axios';
import React, { useEffect } from 'react';
import useAuthInfo from './useAuthInfo';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'https://assignment-eleven-server-black.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logoutUser } = useAuthInfo();
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('error caught in interceptor', error)
            if (error.response?.status === 401 || error.response?.status === 403) {
                logoutUser()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
            return Promise.reject(error)
        })

        return () => {
            axiosInstance.interceptors.response.eject(interceptor);
        };

    }, [logoutUser, navigate])
    return axiosInstance;
};

export default useAxiosSecure;