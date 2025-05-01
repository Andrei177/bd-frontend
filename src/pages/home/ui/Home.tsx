import { Link } from "react-router-dom"
import { Button, Routes } from "../../../shared"
import s from "./Home.module.css"

export const Home = () => {

  return (
    <div className={s.home}>
      <h1>Добро пожаловать в Наш университет!</h1>
      <h2>Войдите или зарегистрируйтесь, чтобы узнать о Наших направлениях обучения больше!</h2>

      <Link to={Routes.SIGNIN}><Button className={s.btn}>Войти</Button></Link>
      <Link to={Routes.SIGNUP}><Button className={s.btn}>Зарегистрироваться</Button></Link>
    </div>
  )
}
