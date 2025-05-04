import { ButtonHTMLAttributes, FC } from "react"
import s from "./Button.module.css"
import cn from "classnames"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
}

export const Button: FC<IButton> = ({className, ...props}) => {
  return (
    <button className={cn(s.btn, className)} {...props}>
      {props.children}
    </button>
  )
}
