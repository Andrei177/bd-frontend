import { PropsWithChildren } from "react"
import s from "./AuthFormLayout.module.css"

const AuthFormLayout = ({children}: PropsWithChildren) => {
  return (
    <div className={s.layout}>
      {children}
    </div>
  )
}

export default AuthFormLayout
