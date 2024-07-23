import { RouteObject } from "react-router-dom";
import Login from "../pages/login";

const PublicRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />,
    }
];

export default PublicRoutes;