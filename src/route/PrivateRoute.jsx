import React from 'react';
import useAuthInfo from '../hooks/useAuthInfo';
import Spinner from '../components/Spinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuthInfo();
    const location = useLocation();

    if (loading) {
        return <Spinner />
    }

    if (user) {
        return children;
    }
    return (
        <Navigate state={location?.pathname} to="/login"></Navigate>
    );
};

export default PrivateRoute;