import { ButtonProps } from "../../types/props"

const Button = ({type, width, Icon, onClick}:ButtonProps) => {
    return(
        <button className={`flex justify-center items-center rounded-md bg-amber-600 hover:bg-amber-500 w-${width} h-7 px-4 py-5 gap-2 text-xl font-semibold text-zinc-100`}
            type={type} onClick={onClick}>
            {Icon && <Icon className="h-6 w-6" />}
            Add Player
        </button>
    )
}

export default Button;