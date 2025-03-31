import { ButtonHTMLAttributes, FC } from "react"
import s from "./Button.module.css"
import cn from "classnames"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
}

const Button: FC<IButton> = ({className, ...props}) => {
  return (
    <button className={cn(s.btn, className)}>
      {props.children}
    </button>
  )
}

export default Button
