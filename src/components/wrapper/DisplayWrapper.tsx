import React, { ReactNode } from 'react'

type ComponentProps = {
    children: ReactNode;
}

const InputFieldWrapper = ({ children }: ComponentProps) => {
  return (
    <div className="flex flex-col rounded-lg bg-zinc-800 w-96 h-fit p-6 gap-10">
        {children}
    </div>
  )
}

export default InputFieldWrapper;
