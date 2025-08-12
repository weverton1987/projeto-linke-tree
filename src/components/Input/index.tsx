import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
    return(
        <input className="bg-white border-0 h-9 rounded-md outline-none px-2 mb-3 text-black placeholder-black" type="text"
        {...props}/>
    )
}