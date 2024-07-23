import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const combinedRoutes = [
    ...PrivateRoutes,
    ...PublicRoutes,
]

const Routes = createBrowserRouter(combinedRoutes);
export default Routes;