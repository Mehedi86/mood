import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-72px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;