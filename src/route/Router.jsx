import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import MoodHistory from "../pages/MoodHistory";
import SoftDelete from "../pages/SoftDelete";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        // errorElement: <ErrorPage />,
        children:[
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/mood-history',
                element: <MoodHistory/>
            },
            {
                path: '/soft-delete',
                element: <SoftDelete/>
            }
            
        ]
        
    }
])

export default router;