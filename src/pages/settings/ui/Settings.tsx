import { useEffect, useState } from "react"
import { Button, Input, Modal } from "../../../shared"
import { Navbar } from "../../../widgets/navbar"
import s from "./Settings.module.css"
import UploadFile from "./UploadFile"
import { saveEnrollee, useAchievementsInfo, useEnrolleeInfo, useEnrolleeStore, useSubjectsInfo, AchievementItem, RequestSetEnrolleeAgrs, SubjectItem } from "../../../entities/user"
import { SelectSubjects } from "./SelectSubjects"
import { SelectAchievements } from "./SelectAchievements"

export const Settings = () => {
    useEnrolleeInfo()

    const { enrollee, setEnrollee, passport_url, certificate_url } = useEnrolleeStore();

    const [showSubjectsModal, setShowSubjectsModal] = useState(false);
    const [showAchievementsModal, setShowAchievementsModal] = useState(false);

    const { visibleSubjects, setVisibleSubjects } = useSubjectsInfo();
    const { visibleAchievements, setVisibleAchievements } = useAchievementsInfo();

    const [scanPassport, setScanPassport] = useState<Blob | string>("")
    const [scanCertificate, setScanCertificate] = useState<Blob | string>("")

    const handleSave = () => {
        const formattedSubjects: SubjectItem[] = visibleSubjects.filter(s => s.result).map(s => ({ subject_id: s.subject_id, result: s.result }))
        const formattedAchievements: AchievementItem[] = visibleAchievements.filter(a => a.checked && a.file).map(a => ({ achievement_id: a.achievement_id, achievement_file: a.file! }))
        const args: RequestSetEnrolleeAgrs = { ...enrollee, subjects: formattedSubjects, achievements: formattedAchievements }

        if (typeof scanPassport != "string") args.scanPassport = scanPassport
        if (typeof scanCertificate != "string") args.scanCertificate = scanCertificate

        saveEnrollee(args)
            .then(res => {
                console.log("Ответ при схранении данных абитуриента", res)
            })
            .catch(err => {
                console.error("Ошибка при сохранении данных абитуриента", err)
            })
        setEnrollee({ ...enrollee, enrollee_id: undefined })
    }
    useEffect(() => {
        if (passport_url) {
            setScanPassport(passport_url)
        }
        if (certificate_url) {
            setScanCertificate(certificate_url)
        }
    }, [enrollee.enrollee_id])
    return (
        <>
            <Navbar />
            <div className={s.container}>
                {enrollee.status === 'approve' && <div className={s.not_edit}>
                    <p>Редактирование недоступно, так как Ваши данные уже прошли проверку</p>
                </div>}
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
                        <Button onClick={() => setShowSubjectsModal(true)}>Указать</Button>
                        <p>Скан аттестата</p>
                        <UploadFile file={scanCertificate} setFile={setScanCertificate} />
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
                        <UploadFile file={scanPassport} setFile={setScanPassport} />
                    </div>
                    <div className={s.data_block}>
                        <p>Индивидуальные достижения</p>
                        <Button onClick={() => setShowAchievementsModal(true)}>Указать</Button>
                        {
                            visibleAchievements.filter(ach => ach.checked).map(ach => (
                                <div key={ach.achievement_id}>
                                    <p>{ach.name_achievement}</p>
                                    <UploadFile file={ach.file ? ach.file : ach.achievement_file_url} setFile={
                                        (file: Blob) => setVisibleAchievements([...visibleAchievements.map(a => {
                                            if (a.achievement_id == ach.achievement_id) {
                                                return { ...a, file }
                                            }
                                            return a
                                        })])
                                    } />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={s.bottom_btn}>
                    <Button onClick={handleSave}>Сохранить</Button>
                </div>
            </div>
            <Modal showModal={showSubjectsModal} setShowModal={setShowSubjectsModal}>
                <SelectSubjects setShowModal={setShowSubjectsModal} subjects={visibleSubjects} setSubjects={setVisibleSubjects} />
            </Modal>
            <Modal showModal={showAchievementsModal} setShowModal={setShowAchievementsModal}>
                <SelectAchievements setShowModal={setShowAchievementsModal} achievements={visibleAchievements} setAchievements={setVisibleAchievements} />
            </Modal>
        </>
    )
}
