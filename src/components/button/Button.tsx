type Props = {
    type:"button" | "submit" | "reset";
    label:string;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    disabled?:boolean;
    onClick?:() => void
}

const Button = ({type, label, Icon, disabled, onClick}:Props) => {
    return(
        <button className={`flex justify-center items-center rounded-md bg-amber-600 hover:bg-amber-500 w-full h-full px-4 py-4 gap-2 text-lg text-zinc-100 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            type={type} onClick={onClick} disabled={disabled}>
            {Icon && <Icon className="h-6 w-6" />}
            {label}
        </button>
    )
}

export default Button;

// w-${width} h-7