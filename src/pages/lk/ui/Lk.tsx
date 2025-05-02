import { Link } from "react-router-dom"
import { Button, Routes } from "../../../shared"
import { Navbar } from "../../../widgets/navbar"
import s from "./Lk.module.css"

export const Lk = () => {
    return (
        <>
            <Navbar />
            <div className={s.container}>
                <h1 className={s.title}>Личный кабинет</h1>
                <div className={s.content}>
                    <div className={s.main_data_wrap}>
                        <h2 className={s.subtitle}>Основные данные</h2>
                        <div className={s.main_data}>
                            <h4>Личные данные</h4>

                            <p>СНИЛС 12312312312</p>
                            <p>Ляпин Андрей Александрович</p>
                            <p>Паспорт 5318 829228</p>

                            <h4>Баллы ЕГЭ</h4>

                            <p>Математика профиль 100</p>
                            <p>Математика профиль 100</p>
                            <p>Математика профиль 100</p>
                        </div>
                        <Link to={Routes.SETTINGS}><Button className={s.btn}>Редактировать данные</Button></Link>
                    </div>
                    <div className={s.directions_wrap}>
                        <h2 className={s.subtitle}>Выбранные направления</h2>
                        <div className={s.directions}>
                            <p className={s.direction}>09.03.01 Информатика и вычислительная техника</p>
                            <p className={s.direction}>09.03.01 Информатика и вычислительная техника</p>
                            <p className={s.direction}>09.03.01 Информатика и вычислительная техника</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
