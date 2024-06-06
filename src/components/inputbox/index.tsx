import { InputBoxProps } from "../../types/inputbox";

const InputBox:React.FC<InputBoxProps> = (props:InputBoxProps) => {
    return(
        <div className="flex flex-col items-start gap-2">
            <div className="text-zinc-50 text-xl">{props.label}</div>
            <input className="h-9 w-full rounded-md shadow-sm ring-1 ring-inset ring-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-100 text-zinc-900 placeholder:text-zinc-400 px-3"
                placeholder={props.placeholder} onChange={props.onChange} />
        </div>
    )
}

export default InputBox;