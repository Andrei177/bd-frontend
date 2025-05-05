import { useEffect, useState } from "react"
import { Button, Input, Modal, Select } from "../../../shared"
import { Navbar } from "../../../widgets/navbar"
import s from "./Settings.module.css"
import UploadFile from "./UploadFile"
import { getAchievements, IAchievementEnrollee, ISubjectEnrollee, saveEnrollee, useEnrolleeStore } from "../../../entities/enrollee"
import { SelectSubjects } from "./SelectSubjects"
import { RequestSetEnrolleeAgrs, SubjectItem } from "../../../entities/enrollee/api/types"

export const Settings = () => {

    const { enrollee, setEnrollee, passport_url, certificate_url } = useEnrolleeStore();

    const [showModal, setShowModal] = useState(false);

    const [visibleSubjects, setVisibleSubjects] = useState<ISubjectEnrollee[]>([]);

    const [visibleAchievements, setVisibleAchievements] = useState<IAchievementEnrollee[]>([]);
    //const [achievementFiles, setAchievementFiles] = useState<AchievementItem[]>([]);

    const [scanPassport, setScanPassport] = useState<Blob | string>("")
    const [scanCertificate, setScanCertificate] = useState<Blob | string>("")

    const handleSave = () => {
        const formattedSubjects: SubjectItem[] = visibleSubjects.filter(s => s.result).map(s => ({ subject_id: s.subject_id, result: s.result }))
        console.log(formattedSubjects)
        const args: RequestSetEnrolleeAgrs = { ...enrollee, subjects: formattedSubjects }

        if(typeof scanPassport != "string") args.scanPassport = scanPassport
        if(typeof scanCertificate != "string") args.scanCertificate = scanCertificate

        saveEnrollee(args)
        .then(res => {
            console.log("Ответ при схранении данных абитуриента", res)
        })
        .catch(err => {
            console.error("Ошибка при сохранении данных абитуриента", err)
        })
        setEnrollee({...enrollee, enrollee_id: undefined})
    }

    useEffect(() => {
        getAchievements()
            .then(res => setVisibleAchievements(res.data.achievements))
            .catch(err => console.error("Ошибка при получении достижений", err))
        if (passport_url) {
            setScanPassport(passport_url)
        }
        if (certificate_url) {
            setScanCertificate(certificate_url)
        }
    }, [])
    return (
        <>
            <Navbar />
            <div className={s.container}>
                <h1 className={s.title}>Редактирование данных</h1>
                <div className={s.content}>
                    <div className={s.data_block}>
                        <p>Фамилия</p>
                        <Input
                            placeholder="Введите фамилию..."
                            value={enrollee.last_name || ""}
                            onChange={e => setEnrollee({ ...enrollee, last_name: e.target.value })}
                        />
                        <p>Имя</p>
                        <Input placeholder="Введите имя..."
                            value={enrollee.first_name || ""}
                            onChange={e => setEnrollee({ ...enrollee, first_name: e.target.value })}
                        />
                        <p>Отчество (если есть)</p>
                        <Input
                            placeholder="Введите отчество..."
                            value={enrollee.patronymic || ""}
                            onChange={e => setEnrollee({ ...enrollee, patronymic: e.target.value })}
                        />
                        <p>Предметы ЕГЭ</p>
                        <Button onClick={() => setShowModal(true)}>Указать</Button>
                        <p>Скан аттестата</p>
                        <UploadFile file={scanCertificate} setFile={setScanCertificate}/>
                    </div>
                    <div className={s.data_block}>
                        <p>Серия паспорта</p>
                        <Input
                            placeholder="Введите серию..."
                            value={enrollee.passport_series || ""}
                            onChange={e => setEnrollee({ ...enrollee, passport_series: e.target.value })}
                        />
                        <p>Номер паспорта</p>
                        <Input
                            placeholder="Введите номер..."
                            value={enrollee.passport_number || ""}
                            onChange={e => setEnrollee({ ...enrollee, passport_number: e.target.value })}
                        />
                        <p>Скан паспорта</p>
                        <UploadFile file={scanPassport} setFile={setScanPassport}/>
                    </div>
                    <div className={s.data_block}>
                        <p>Индивидуальные достижения</p>
                        <Select options={visibleAchievements.map(achiev => ({ value: achiev.achievement_id, label: achiev.name_achievement }))} />
                        {/* <p>Скан Золото ГТО</p>
                        <UploadFile /> */}
                    </div>
                </div>
                <div className={s.bottom_btn}>
                    <Button onClick={handleSave}>Сохранить</Button>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <SelectSubjects setShowModal={setShowModal} subjects={visibleSubjects} setSubjects={setVisibleSubjects} />
            </Modal>
        </>
    )
}
