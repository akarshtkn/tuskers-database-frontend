import { Outlet } from "react-router-dom"
import Navbar from "../navbar"

const Layout:React.FC = () => {
    return(
        <div className="flex h-screen">
            <div className="basis-1/3 bg-zinc-800">
                <Navbar />
            </div>
            <div className="basis-2/3 bg-zinc-900 px-20 py-16">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;