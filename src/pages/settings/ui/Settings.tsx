import { Button, Input, Select } from "../../../shared"
import { Navbar } from "../../../widgets/navbar"
import s from "./Settings.module.css"
import UploadFile from "./UploadFile"

export const Settings = () => {
    return (
        <>
            <Navbar />
            <div className={s.container}>
                <h1 className={s.title}>Редактирование данных</h1>
                <div className={s.content}>
                    <div className={s.data_block}>
                        <p>Фамилия</p>
                        <Input placeholder="Введите фамилию..." />
                        <p>Имя</p>
                        <Input placeholder="Введите имя..." />
                        <p>Отчество (если есть)</p>
                        <Input placeholder="Введите отчество..." />
                        <p>Предметы ЕГЭ</p>
                        <Button>Указать</Button>
                        <p>Скан аттестата</p>
                        <UploadFile />
                    </div>
                    <div className={s.data_block}>
                        <p>Серия паспорта</p>
                        <Input placeholder="Введите серию..." />
                        <p>Номер паспорта</p>
                        <Input placeholder="Введите номер..." />
                        <p>Скан паспорта</p>
                        <UploadFile />
                    </div>
                    <div className={s.data_block}>
                        <p>Индивидуальные достижения</p>
                        <Select options={["Золото ГТО", "Победа на олимпиаде", "Что-то крутое"]} />
                        <p>Скан Золото ГТО</p>
                        <UploadFile />
                    </div>
                </div>
                <div className={s.bottom_btn}>
                    <Button>Сохранить</Button>
                </div>
            </div>
        </>
    )
}
