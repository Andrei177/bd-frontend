import { Link } from "react-router-dom"
import { Button, Loader, Routes } from "../../../shared"
import { Navbar } from "../../../widgets/navbar"
import s from "./Lk.module.css"
import { useEnrolleeInfo, useEnrolleeStore } from "../../../entities/user"

export const Lk = () => {

    const { enrollee, isLoading, message } = useEnrolleeInfo()
    const store = useEnrolleeStore();

    return (
        <>
            <Navbar />
            <div className={s.container}>
                <h1 className={s.title}>Личный кабинет</h1>
                {
                    isLoading
                        ? <Loader />
                        :
                        <div className={s.content}>
                            <div className={s.main_data_wrap}>
                                <h2 className={s.subtitle}>Основные данные</h2>
                                <div className={s.main_data}>
                                    <h4>Личные данные</h4>
                                    {
                                        message
                                            ? <h3>{message}</h3>
                                            : <><p>СНИЛС {store.snils}</p>
                                                <p>{enrollee.last_name} {enrollee.first_name} {enrollee.patronymic}</p>
                                                <p>Паспорт {enrollee.passport_series} {enrollee.passport_number}</p>

                                                <h4>Баллы ЕГЭ</h4>

                                                {store.subjects.map(s => {
                                                    return <p key={s.subject_id}>{s.name_subject} {s.result}</p>
                                                })}
                                            </>
                                    }
                                </div>
                                <Link to={Routes.SETTINGS}><Button className={s.btn}>Редактировать данные</Button></Link>
                            </div>
                            <div className={s.directions_wrap}>
                                <h2 className={s.subtitle}>Выбранные направления</h2>
                                {
                                    message
                                        ? <h3>{message}</h3>
                                        : <div className={s.directions}>
                                            <p className={s.direction}>09.03.01 Информатика и вычислительная техника</p>
                                            <p className={s.direction}>09.03.01 Информатика и вычислительная техника</p>
                                            <p className={s.direction}>09.03.01 Информатика и вычислительная техника</p>
                                        </div>
                                }
                            </div>
                        </div>
                }
            </div>
        </>
    )
}
