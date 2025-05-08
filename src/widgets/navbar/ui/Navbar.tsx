import { NavLink, useNavigate } from "react-router-dom"
import s from "./Navbar.module.css"
import { Routes } from "../../../shared"
import { logout } from "../../../features/auth"
import { ADMIN_ROLE_ID, useEnrolleeStore, useUserStore } from "../../../entities/user"

export const Navbar = () => {

  const navigate = useNavigate();
  const { setEmpty } = useEnrolleeStore();
  const { roleId, setUser } = useUserStore();

  const handleLogout = () => {
    logout()
      .then(res => {
        console.log("Ответ при выходе из аккаунта", res)
        setEmpty()
        setUser({userId: null, roleId: null, userSnils: ""})
        navigate(Routes.ROOT)
      })
      .catch(err => {
        console.error("Ошибка при выходе из аккаунта", err)
      })
  }

  return (
    <ul className={s.navbar}>
      {
        roleId == ADMIN_ROLE_ID
          ? <li className={s.nav_item}><NavLink to={Routes.ENROLLEES}>Абитуриенты</NavLink></li>
          : <>
            <li className={s.nav_item}><NavLink to={Routes.LISTS}>Поступление</NavLink></li>
            <li className={s.nav_item}><NavLink to={Routes.LK}>Личный кабинет</NavLink></li>
          </>
      }
      <li className={s.nav_item} onClick={handleLogout}>Выйти</li>
    </ul>
  )
}
