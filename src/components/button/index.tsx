import { PlusIcon } from "@heroicons/react/20/solid";
import { ButtonProps } from "../../types/buttonprops"

const Button:React.FC<ButtonProps> = ({onClick}) => {
    return(
        <button className="flex justify-center items-center rounded-md bg-amber-600 hover:bg-amber-500 w-52 h-7 px-4 py-5 gap-2 text-xl font-semibold text-zinc-100"
            onClick={onClick}>
            <div className="h-6 w-6"><PlusIcon /></div>
            Add Player
        </button>
    )
}

export default Button;