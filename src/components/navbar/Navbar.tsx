import { useNavigate } from "react-router-dom";
import { options } from "./options";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import Modal from "../modal/Modal";
import { useContext, useState } from "react";
import Button from "../button/Button";
import AuthContext from "../../context/AuthProvider";
import Alert from "../alert/Alert";
import Loader from "../loader/Loader";
import AuthService from "../../service/AuthService";
import { ApiError, User } from "../../types/Types";

const Navbar:React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleButtonClick = (route:string) => {
        navigate(route);
    }

    const handleLogout = async () => {
        setLoading(true);
        setError(null);

        let { error } = await AuthService.logout();
        if (error) {
            setError(error);
            setLoading(false);
            setTimeout(() => {
                setOpen(false);
                setError(null);
            }, 3000);
        } else {
            setSuccess(true);
            setAuth({} as User);
            setLoading(false);
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        }
    }

    return(
        <div className="flex flex-col justify-start px-20 py-16 gap-16">
            <div>
                <div className="text-3xl text-zinc-400">Welcome back,</div>
                <h1 className="font-medium text-5xl text-zinc-50">Unais Ikka !</h1>
            </div>    
            <div className="text-zinc-400">Tuskers player statistics Database</div>
            
            <div className="flex flex-col gap-4">
                {options.map((option) => (
                    <button className={`flex items-center gap-4 
                    ${location.pathname === option.route ? "text-amber-500 translate-x-4" : "text-zinc-500 hover:text-zinc-50 hover:translate-x-4 hover:scale-105 transition-transform duration-300 ease-in-out"}`} 
                    key={option.id} onClick={() => handleButtonClick(option.route)}>
                        <div className="h-6 w-6">{option.icon}</div>
                        <div className="text-xl font-medium">{option.field}</div>
                    </button>
                ))}
            </div>

            <button className={"flex items-center gap-4 text-zinc-500 hover:text-zinc-50 hover:translate-x-4 hover:scale-105 transition-transform duration-300 ease-in-out"} 
                onClick={() => setOpen(true)}>
                    <div className="h-6 w-6"><ArrowLeftStartOnRectangleIcon /></div>
                    <div className="text-xl font-medium">Logout</div>
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <p className="text-xl text-amber-500 font-bold mb-5">Logout</p>
                <p className="text-lg text-zinc-50 mb-4">Are you sure you want to logout?</p>
                <div className="flex justify-end gap-2 mb-4">
                    <button className="bg-zinc-50 rounded-md text-zinc-800 py-1 px-2" onClick={() => setOpen(false)}>Cancel</button>
                    <div className="w-16 h-4">
                        <Button type="button" label="Yes" onClick={handleLogout}/>
                    </div>
                </div>
                {loading && <Loader />}
                {success && <Alert isSuccess={true} isFailure={false} message="User logged out. Redirecting to Login page" />}
                {error && <Alert isSuccess={false} isFailure={true} message={error.message} />}
            </Modal>
        </div>
    )
}

export default Navbar;