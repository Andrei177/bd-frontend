import {  NavLink, useNavigate } from "react-router-dom"
import s from "./Navbar.module.css"
import { Routes } from "../../../shared"
import { logout } from "../../../features/auth"

export const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    .then(res => {
      console.log("Ответ при выходе из аккаунта", res)
      navigate(Routes.ROOT)
    })
    .catch(err => {
      console.error("Ошибка при выходе из аккаунта", err)
    })
  }

  return (
    <ul className={s.navbar}>
      <li className={s.nav_item}><NavLink to={Routes.LISTS}>Поступление</NavLink></li>
      <li className={s.nav_item}><NavLink to={Routes.LK}>Личный кабинет</NavLink></li>
      <li className={s.nav_item} onClick={handleLogout}>Выйти</li>
    </ul>
  )
}
