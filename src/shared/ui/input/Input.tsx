import { FC, InputHTMLAttributes } from "react"
import cn from "classnames"
import s from "./Input.module.css"

interface IInput extends InputHTMLAttributes<HTMLInputElement>{
    className?: string;
}

export const Input: FC<IInput> = ({className, ...props}) => {
  return (
    <input {...props} className={cn(s.inp, className)}/>
  )
}
