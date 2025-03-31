import { FC, InputHTMLAttributes } from "react"
import cn from "classnames"
import s from "./Input.module.css"

interface IInput extends InputHTMLAttributes<HTMLInputElement>{
    className?: string;
}

const Input: FC<IInput> = ({className, ...props}) => {
  return (
    <input {...props} type="text" className={cn(s.inp, className)}/>
  )
}

export default Input
