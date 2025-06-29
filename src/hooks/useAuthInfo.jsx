import React, { useContext } from 'react';
import AuthContext from '../providers/AuthContext';

const useAuthInfo = () => {
    const context = useContext(AuthContext);
    return context;
};

export default useAuthInfo;