import { InputBoxProps } from "../../types/props";

const InputBox = ({label, value, placeholder, debounce, onChange}:InputBoxProps) => {
    return(
        <div className="flex flex-col items-start gap-2">
            <div className="flex justify-between w-full">
                <label className="text-zinc-50 text-xl">{label}</label>
                {debounce && <div className="mt-3 text-xs italic text-amber-500">*{label} already exist</div>}
            </div>
            <input className="h-9 w-full rounded-md shadow-sm ring-1 ring-inset ring-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-100 text-zinc-900 placeholder:text-zinc-400 px-3"
                value={value} placeholder={placeholder} required onChange={onChange} />
        </div>
    )
}

export default InputBox;