import { FC, SelectHTMLAttributes } from "react"
import s from "./Select.module.css"
import cn from "classnames"

type Option = {
  value: number | string,
  label: number | string
}

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement>{
    className?: string;
    options: Option[] 
}

export const Select: FC<ISelect> = ({ className, options, ...props }) => {
  return (
    <select className={cn(s.select, className)} {...props}>
      {
        options.map(opt => <option value={opt.value} key={opt.value}>{opt.label}</option>)
      }
    </select>
  )
}
