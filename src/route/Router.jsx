import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import Home from "../pages/Home";
// import AllBooks from "../pages/AllBooks";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import GenreWiseBooks from "../pages/GenreWiseBooks";
// import BookDetails from "../pages/BookDetails";
// import AddBook from "../pages/AddBook";
// import UpdateBook from "../pages/UpdateBook";
// import BorrowedBooks from "../pages/BorrowedBooks";
// import PrivateRoute from "./PrivateRoute";
// import ErrorPage from "../pages/ErrorPage";
// import BookDetailsWithoutBorrow from "../pages/BookDetailsWithoutBorrow";

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
            }
        ]
        
    }
])

export default router;