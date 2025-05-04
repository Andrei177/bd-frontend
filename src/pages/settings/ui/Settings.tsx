import { useEffect, useState } from "react"
import { Button, Input, Modal, Select } from "../../../shared"
import { Navbar } from "../../../widgets/navbar"
import s from "./Settings.module.css"
import UploadFile from "./UploadFile"
import { getAchievements, getSubjects, IAchievement, ISubject, useEnrolleeStore } from "../../../entities/enrollee"
import { SelectSubjects } from "./SelectSubjects"

export const Settings = () => {

    const [showModal, setShowModal] = useState(false);
    const [subjects, setSubjects] = useState<(ISubject)[]>([])
    const { subjects: subjectsStore} = useEnrolleeStore();

    const [achievements, setAchievements] = useState<IAchievement[]>([])

    useEffect(() => {
        getSubjects()
            .then(res => {
                const tmpArr: ISubject[] = res.data.subjects;

                subjectsStore.forEach(sub => {
                    if (sub.result) {
                        for (let i = 0; i < tmpArr.length; i++) {
                            if (sub.subject_id == tmpArr[i].subject_id) {
                                tmpArr[i] = {...tmpArr[i], result: sub.result}
                            }
                        }
                    }
                })

                setSubjects([...tmpArr])
            })
            .catch(err => console.error("Ошибка при получении предметов", err))

        getAchievements()
            .then(res => setAchievements(res.data.achievements))
            .catch(err => console.error("Ошибка при получении достижений", err))
    }, [])
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
                        <Button onClick={() => setShowModal(true)}>Указать</Button>
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
                        <Select options={achievements.map(achiev => ({ value: achiev.achievement_id, label: achiev.name_achievement }))} />
                        <p>Скан Золото ГТО</p>
                        <UploadFile />
                    </div>
                </div>
                <div className={s.bottom_btn}>
                    <Button>Сохранить</Button>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <SelectSubjects setShowModal={setShowModal} subjects={subjects} setSubjects={setSubjects}/>
            </Modal>
        </>
    )
}
