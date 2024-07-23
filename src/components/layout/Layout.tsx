import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"

const Layout:React.FC = () => {
    return(
        <div className="flex h-screen">
            <div className="bg-zinc-800">
                <Navbar />
            </div>
            <div className="basis-3/4 bg-zinc-900 px-20 py-16">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;