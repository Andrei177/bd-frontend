import { PropsWithChildren } from "react"
import s from "./ListItem.module.css"

export const ListItem = ({ children }: PropsWithChildren) => {
  return (
    <div className={s.list_item}>
      {children}
    </div>
  )
}
