import { ReactNode } from "react"
import s from "./Modal.module.css"

interface IModal{
    showModal: boolean,
    setShowModal: (bool: boolean) => void,
    children: ReactNode
}

export const Modal = ({ children, showModal, setShowModal }: IModal) => {
  return (
    showModal && <div className={s.wrap} onClick={() => setShowModal(false)}>
      <div className={s.content} onClick={e => e.stopPropagation()}>
        { children }
      </div>
    </div>
  )
}
