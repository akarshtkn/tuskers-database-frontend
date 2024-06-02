import { useNavigate } from "react-router-dom";
import options from "./options";

const Navbar:React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = (route:string) => {
        navigate(route);
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
        </div>
    )
}

export default Navbar;



