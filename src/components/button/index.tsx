import { ButtonProps } from "../../types/props"

const Button = ({type, label, width, Icon, disabled, onClick}:ButtonProps) => {
    return(
        <button className={`flex justify-center items-center rounded-md bg-amber-600 hover:bg-amber-500 w-${width} h-7 px-4 py-5 gap-2 text-xl font-semibold text-zinc-100 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            type={type} onClick={onClick} disabled={disabled}>
            {Icon && <Icon className="h-6 w-6" />}
            {label}
        </button>
    )
}

export default Button;