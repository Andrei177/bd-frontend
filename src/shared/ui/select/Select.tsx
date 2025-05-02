import { FC, SelectHTMLAttributes } from "react"
import s from "./Select.module.css"
import cn from "classnames"

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement>{
    className?: string;
    options: string[] 
}

export const Select: FC<ISelect> = ({ className, options, ...props }) => {
  return (
    <select className={cn(s.select, className)} {...props}>
      {
        options.map(opt => <option value={opt} key={opt}>{opt}</option>)
      }
    </select>
  )
}
