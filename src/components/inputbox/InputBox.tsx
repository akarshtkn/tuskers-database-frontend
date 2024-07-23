import React from "react";

type Props = {
    label:string;
    type:"text" | "password";
    value:string;
    placeholder:string;
    debounce?:boolean;
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    error?:string;
}

const InputBox = React.memo(({label, type, value, placeholder, debounce, onChange, error}:Props) => {
    return(
        <div className="flex flex-col items-start gap-2">
            <div className="flex justify-between w-full">
                <label className="text-zinc-50 text-xl">{label}</label>
                {debounce && <div className="mt-3 text-xs italic text-red-500">*{label} already exist</div>}
            </div>
            <input className="h-9 w-full rounded-md shadow-sm ring-1 ring-inset ring-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-zinc-100 text-zinc-900 placeholder:text-zinc-400 px-3"
                type={type} value={value} placeholder={placeholder} onChange={onChange} />
            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    )
});

export default InputBox;