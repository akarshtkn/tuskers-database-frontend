import ErrorPage from "../pages/error";
import Layout from "../components/layout/Layout";
import AddPlayer from "../pages/addplayer";
import PlayerDetails from "../pages/playerdetails";
import Home from "../pages/home";
import { Navigate, RouteObject } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            { isAuthenticated? children : <Navigate to = { '/login'} /> }
        </>
    )
};

const PrivateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                // element: <ProtectedRoute children={ <Home/> } />,
                element: <Home />,
                index: true,
            },
            {
                path: '/addPlayer',
                // element: <ProtectedRoute children={ <AddPlayer /> } />,
                element: <AddPlayer />
            },
            {
                path: '/playerDetails',
                // element: <ProtectedRoute children={ <PlayerDetails /> } />,
                element: <PlayerDetails />
            }
        ]
    },
];

export default PrivateRoutes;